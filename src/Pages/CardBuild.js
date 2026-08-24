// src/Pages/CardBuild.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllCollections, getCollectionsByCategory, getCollectionsByName } from "../api/catalog";
import "../Components/card__wrapper.css";
import "../Components/Card.css";

export default function CardBuild() {
  const { id, Name } = useParams();

  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const loadMoreCount = 8;

  // ===== Загрузка данных из Supabase =====
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      let data = [];
      
      try {
        if (Name) {
          data = await getCollectionsByName(Name);
        } else if (id) {
          data = await getCollectionsByCategory(id);
        } else {
          data = await getAllCollections();
        }
        setCatalog(data);
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        setCatalog([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, Name]);

  // ===== Пагинация =====
  const visibleCards = catalog.slice(0, visibleCount);
  const hasMore = visibleCount < catalog.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + loadMoreCount);
  };

  const getImageUrl = (image) => {
    if (Array.isArray(image) && image.length > 0) {
      return image[0];
    }
    if (typeof image === "string") {
      return image;
    }
    return "/images/placeholder.jpg";
  };

  const categoryNames = {
    "Plitka": "Керамическая плитка",
    "Keramogranit": "Керамогранит",
    "GibkyMramor": "Гибкий мрамор",
  };
  
  let pageTitle = "Каталог";
  if (Name) {
    pageTitle = Name;
  } else if (id && categoryNames[id]) {
    pageTitle = categoryNames[id];
  } else if (id) {
    pageTitle = id;
  }

  if (loading) {
    return (
      <div className="load-more__loader">
        <div className="load-more__spinner"></div>
        <p>Загрузка каталога...</p>
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
      <h1 className="card-build__title">{pageTitle}</h1>
      
      <div className="card-build__info">
        <span>Показано {Math.min(visibleCount, catalog.length)} из {catalog.length}</span>
      </div>

      <ul className="card__wrapper">
        {visibleCards.map((card) => (
          <li key={card.id}>
            <div className="card__body">
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
            Загрузить ещё ({visibleCount} из {catalog.length})
          </button>
        </div>
      )}

      {!hasMore && catalog.length > 8 && (
        <p className="load-more__end">Все коллекции загружены ({catalog.length})</p>
      )}
    </div>
  );
}