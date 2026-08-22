import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../Components/card__wrapper.css";
import "../Components/Card.css";
import Cards from "../Constants/DirlisterListCatalog";

export default function CardBuild() {
  let { id } = useParams();

  // Пагинация
  const [visibleCount, setVisibleCount] = useState(8);
  const loadMoreCount = 8;

  // Фильтруем карточки по категории (id из URL)
  const filteredCards = Cards.filter((card) => card.Category === id);
  
  // Берём только видимые карточки
  const visibleCards = filteredCards.slice(0, visibleCount);
  
  // Проверяем, есть ли ещё карточки
  const hasMore = visibleCount < filteredCards.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + loadMoreCount);
  };

  // Безопасное получение изображения
  const getImageUrl = (image) => {
    if (Array.isArray(image) && image.length > 0) {
      return image[0];
    }
    if (typeof image === "string") {
      return image;
    }
    return "/images/placeholder.jpg";
  };

  // Заголовок страницы (можно добавить красивый заголовок)
  const pageTitle = id || "Каталог";

  return (
    <div className="card-build">
      <h1 className="card-build__title">{pageTitle}</h1>
      
      <ul className="card__wrapper">
        {visibleCards.map((card) => (
          <li key={card.id}>
            <div className="card__body">
              <Link to={`/catalog/${card.Name}`}>
                <img
                  className="card__img"
                  src={getImageUrl(card.interiors)}
                  alt={card.Name}
                />
              </Link>
              <Link
                to={`/catalog/${card.Name}/${card.Collection}`}
                className="card__collection"
              >
                {card.Collection}
              </Link>
              <Link to={`/catalog/${card.Name}`} className="card__name">
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

      {/* Если карточек нет */}
      {filteredCards.length === 0 && (
        <p className="load-more__empty">Коллекции в этой категории не найдены</p>
      )}
    </div>
  );
}