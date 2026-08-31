// src/Pages/Category.jsx
import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useCollectionsByCategory } from "../hooks/useCatalog";
import Breadcrumbs from "../Components/Breadcrumbs";
import { CardSkeleton } from "../Components/Skeletons";
import SEO from "../Components/SEO";
import { SEO as SEOMeta } from "../utils/seo";
import { SITE_URL } from "../config";
import FavoriteButton from '../Components/FavoriteButton';
import "../Components/card__wrapper.css";
import "../Components/Card.css";

export default function Category() {
  const { id } = useParams();
  const [visibleCount, setVisibleCount] = useState(8);
  const [sortMode, setSortMode] = useState("random");
  const loadMoreCount = 8;

  // ===== Используем React Query =====
  const { data: catalog = [], isLoading } = useCollectionsByCategory(id);

  const processedCatalog = useMemo(() => {
    if (catalog.length === 0) return [];
    let result = [...catalog];
    if (sortMode === "alphabet") {
      result.sort((a, b) =>
        (a.collection || "").localeCompare(b.collection || "", "ru")
      );
    } else {
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
    }
    return result;
  }, [catalog, sortMode]);

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

  const toggleSortMode = () => {
    setSortMode(sortMode === "random" ? "alphabet" : "random");
    setVisibleCount(8);
  };

  const categoryNames = {
    Plitka: "Керамическая плитка",
    Keramogranit: "Керамогранит",
    GibkyMramor: "Гибкий мрамор",
  };
  const pageTitle = categoryNames[id] || id || "Каталог";

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
        <h2>Категория не найдена</h2>
        <p>В категории "{pageTitle}" нет коллекций.</p>
        <button className="card-pit__back-btn" onClick={() => window.history.back()}>
          ← Вернуться назад
        </button>
      </div>
    );
  }

  return (
    <div className="card-build">
      <SEO
        title={SEOMeta.categories[id]?.title}
        description={SEOMeta.categories[id]?.description}
        keywords={SEOMeta.categories[id]?.keywords}
        url={`${SITE_URL}${id}`}
      />
      <Breadcrumbs />
      <h1 className="card-build__title">{pageTitle}</h1>

      <div className="card-build__info">
        <span>
          Показано {Math.min(visibleCount, processedCatalog.length)} из {processedCatalog.length}
        </span>
        <button className="toggle-sort__button" onClick={toggleSortMode}>
          {sortMode === "random" ? "🔀 Случайно" : "📋 По алфавиту"}
        </button>
      </div>

      <ul className="card__wrapper">
        {visibleCards.map((card) => (
          <li key={card.id}>
            <div className="card__body">
              <FavoriteButton item={card} />
              <Link
                to={`/${card.category}/${card.name}?scrollTo=${encodeURIComponent(card.collection)}`}
              >
                <img
                  className="card__img"
                  src={getImageUrl(card.interiors)}
                  alt={card.name}
                />
              </Link>
              <Link
                to={`/${card.category}/${card.name}?scrollTo=${encodeURIComponent(card.collection)}`}
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

      <div className="category-page__actions">
        {hasMore && (
          <button className="load-more__button" onClick={loadMore}>
            Загрузить ещё ({visibleCount} из {processedCatalog.length})
          </button>
        )}
        <button className="reshuffle__button" onClick={toggleSortMode}>
          {sortMode === "random" ? "🔀 Случайно" : "📋 По алфавиту"}
        </button>
      </div>
    </div>
  );
}