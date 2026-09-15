// src/Pages/CardBuild.jsx
import React, { useState, useMemo, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Breadcrumbs from "../Components/Breadcrumbs";
import { CardSkeleton } from "../Components/Skeletons";
import SEO from "../Components/SEO";
import { SITE_URL } from "../config";
import FavoriteButton from '../Components/FavoriteButton';
import "../Components/card__wrapper.css";
import "../Components/Card.css";
import { useCatalog } from "../hooks/useCatalog";

export default function CardBuild() {
  const { id, Name } = useParams();
  const location = useLocation();
  const [visibleCount, setVisibleCount] = useState(8);
  const loadMoreCount = 8;

  // ===== Используем универсальный хук =====
  const { data: catalog = [], isLoading } = useCatalog(id, Name);

    // ===== Сортировка =====
  const processedCatalog = useMemo(() => {
    if (catalog.length === 0) return [];

    if (Name && Name.trim() !== "") {
      return [...catalog].sort((a, b) =>
        (a.collection || "").localeCompare(b.collection || "", "ru")
      );
    }

    const shuffled = [...catalog];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [catalog, Name]);

  // ===== Пагинация =====
  const visibleCards = processedCatalog.slice(0, visibleCount);
  const hasMore = visibleCount < processedCatalog.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + loadMoreCount);
  };

  const getImageUrl = (image) => {
    if (Array.isArray(image) && image.length > 0) return image[0];
    if (typeof image === "string") return image;
    return "/images/placeholder.jpg";
  };

  const categoryNames = {
    Plitka: "Керамическая плитка",
    Keramogranit: "Керамогранит",
    GibkyMramor: "Гибкий мрамор",
  };
  
  let pageTitle = "Каталог";
  if (Name) {
    pageTitle = `Коллекции ${Name}`;
  } else if (id && categoryNames[id]) {
    pageTitle = categoryNames[id];
  } else if (id) {
    pageTitle = id;
  }

// src/Pages/CardBuild.jsx

// ===== Скролл к коллекции из URL =====
useEffect(() => {
  if (isLoading || catalog.length === 0) return;

  const params = new URLSearchParams(location.search);
  const scrollTo = params.get("scrollTo");

  if (!scrollTo) return;

  const decoded = decodeURIComponent(scrollTo);
  const index = processedCatalog.findIndex(
    (item) => item.collection === decoded
  );

  if (index === -1) return;

  // Если карточка не в видимой области — подгружаем её
  if (index >= visibleCount) {
    const newCount = Math.ceil((index + 1) / loadMoreCount) * loadMoreCount;
    setVisibleCount(Math.min(newCount, processedCatalog.length));
  }

  // Скроллим + подсвечиваем
  setTimeout(() => {
    const targetId = `card-${processedCatalog[index].id}`;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.style.transition = "background 0.5s ease, padding 0.3s ease";
      element.style.background = "rgba(212, 181, 3, 0.15)";
      element.style.borderRadius = "12px";
      element.style.padding = "4px";
      
      setTimeout(() => {
        element.style.background = "transparent";
        element.style.padding = "0";
      }, 5000);
    }
  }, 400);
}, [isLoading, catalog, processedCatalog, location.search, visibleCount, loadMoreCount]);

  if (isLoading) {
    return (
      <div className="card-build">
        <Breadcrumbs />
        <h1 className="card-build__title">{pageTitle}</h1>
        <CardSkeleton count={8} />
      </div>
    );
  }

  if (catalog.length === 0) {
    return (
      <div className="card-pit__empty">
        <h2>Ничего не найдено</h2>
        <p>
          {Name 
            ? `У производителя "${Name}" нет коллекций в этой категории.`
            : `В категории "${pageTitle}" нет коллекций.`
          }
        </p>
        <button 
          className="card-pit__back-btn"
          onClick={() => window.history.back()}
        >
          ← Вернуться назад
        </button>
      </div>
    );
  }

  return (
    <div className="card-build">
      <SEO
        title={`${pageTitle} — VOK Ceramic`}
        description={`Коллекции ${pageTitle} в каталоге VOK Ceramic. Широкий выбор, доставка по России.`}
        url={`${SITE_URL}${location.pathname}`}
      />
      <Breadcrumbs />
      <h1 className="card-build__title">{pageTitle}</h1>
      
      <div className="card-build__info">
        <span>Показано {Math.min(visibleCount, processedCatalog.length)} из {processedCatalog.length}</span>
      </div>

      <ul className="card__wrapper">
        {visibleCards.map((card) => (
          <li key={card.id} id={`card-${card.id}`} className="card-list-item">
            <div className="card__body">
              <FavoriteButton item={card} />
              <Link to={`/${card.category}/${card.name}/${card.collection}`}>
                <img
                  className="card__img"
                  src={getImageUrl(card.interiors)}
                  alt={card.name}
                />
              </Link>
              <Link
                to={`/${card.category}/${card.name}/${card.collection}`}
                className="card__collection"
              >
                {card.collection}
              </Link>
              <Link to={`/${card.category}/${card.name}`} className="card__name">
                {card.name}
              </Link>
              <p className="card__country">{card.country}</p>
            </div>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="load-more">
          <button className="load-more__button" onClick={loadMore}>
            Загрузить ещё ({visibleCount} из {processedCatalog.length})
          </button>
        </div>
      )}

      {!hasMore && processedCatalog.length > 8 && (
        <p className="load-more__end">Все коллекции загружены ({processedCatalog.length})</p>
      )}
    </div>
  );
}