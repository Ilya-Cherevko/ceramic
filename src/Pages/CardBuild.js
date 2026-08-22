import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../Components/card__wrapper.css";
import "../Components/Card.css";
import Cards from "../Constants/DirlisterListCatalog";

// Ключ для localStorage
const STORAGE_KEY = "catalog_data";

export default function CardBuild() {
  const { id, Name } = useParams();

  // ===== Загрузка данных из localStorage =====
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCatalog(parsed);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.error("Ошибка загрузки данных:", e);
      }
      // Если данных нет — используем исходные
      setCatalog(Cards);
      setLoading(false);
    };

    loadData();
  }, []);

  // ===== Ключ для сохранения состояния пагинации =====
  const storageKey = `cardBuild_visibleCount_${id}_${Name || "all"}`;

  // ===== Загрузка сохранённого состояния пагинации =====
  const getSavedCount = () => {
    const saved = localStorage.getItem(storageKey);
    return saved ? parseInt(saved, 10) : 8;
  };

  const [visibleCount, setVisibleCount] = useState(getSavedCount);
  const loadMoreCount = 8;

  // ===== Фильтрация карточек =====
  let filteredCards = [];
  
  if (Name) {
    // Если есть Name — фильтруем по производителю
    filteredCards = catalog.filter((card) => card.Name === Name);
  } else if (id) {
    // Если есть только id — фильтруем по категории
    filteredCards = catalog.filter((card) => card.Category === id);
  } else {
    // Если ничего нет — показываем все
    filteredCards = catalog;
  }

  // Берём только видимые карточки
  const visibleCards = filteredCards.slice(0, visibleCount);
  
  // Проверяем, есть ли ещё карточки
  const hasMore = visibleCount < filteredCards.length;

  // ===== Функция загрузки ещё =====
  const loadMore = () => {
    const newCount = visibleCount + loadMoreCount;
    setVisibleCount(newCount);
    localStorage.setItem(storageKey, String(newCount));
  };

  // ===== Сохраняем состояние при изменении =====
  useEffect(() => {
    localStorage.setItem(storageKey, String(visibleCount));
  }, [visibleCount, storageKey]);

  // ===== Сохраняем состояние при уходе со страницы =====
  const saveState = () => {
    localStorage.setItem(storageKey, String(visibleCount));
  };

  // ===== Безопасное получение изображения =====
  const getImageUrl = (image) => {
    if (Array.isArray(image) && image.length > 0) {
      return image[0];
    }
    if (typeof image === "string") {
      return image;
    }
    return "/images/placeholder.jpg";
  };

  // ===== Заголовок страницы =====
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

  // ===== Загрузка =====
  if (loading) {
    return (
      <div className="load-more__loader">
        <div className="load-more__spinner"></div>
        <p>Загрузка каталога...</p>
      </div>
    );
  }

  // ===== Если карточек нет =====
  if (filteredCards.length === 0) {
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

  // ===== Рендеринг =====
  return (
    <div className="card-build">
      <h1 className="card-build__title">{pageTitle}</h1>
      
      <div className="card-build__info">
        <span>Показано {Math.min(visibleCount, filteredCards.length)} из {filteredCards.length}</span>
      </div>

      <ul className="card__wrapper">
        {visibleCards.map((card) => (
          <li key={card.id}>
            <div className="card__body">
              <Link 
                to={`/${id}/${card.Name}/${card.Collection}`}
                onClick={saveState}
              >
                <img
                  className="card__img"
                  src={getImageUrl(card.interiors)}
                  alt={card.Name}
                />
              </Link>
              
              <Link
                to={`/${id}/${card.Name}/${card.Collection}`}
                className="card__collection"
                onClick={saveState}
              >
                {card.Collection}
              </Link>
              
              <Link 
                to={`/${id}/${card.Name}`} 
                className="card__name"
                onClick={saveState}
              >
                {card.Name}
              </Link>
              <p className="card__country">{card.Сountry}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Кнопка "Загрузить ещё" */}
      {hasMore && (
        <div className="load-more">
          <button className="load-more__button" onClick={loadMore}>
            Загрузить ещё ({visibleCount} из {filteredCards.length})
          </button>
        </div>
      )}

      {/* Если все карточки загружены */}
      {!hasMore && filteredCards.length > 8 && (
        <p className="load-more__end">Все коллекции загружены ({filteredCards.length})</p>
      )}
    </div>
  );
}