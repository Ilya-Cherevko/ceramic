// src/Pages/Favorites.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import Breadcrumbs from '../Components/Breadcrumbs';
import FavoriteButton from '../Components/FavoriteButton';
import '../Components/card__wrapper.css';
import '../Components/Card.css';

export default function Favorites() {
  const { favorites } = useFavorites();

  const getImageUrl = (image) => {
    if (Array.isArray(image) && image.length > 0) {
      return image[0];
    }
    if (typeof image === 'string') {
      return image;
    }
    return '/images/placeholder.jpg';
  };

  return (
    <div className="card-build">
      <Breadcrumbs />
      <h1 className="card-build__title">⭐ Избранное</h1>

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <p>😊 У вас пока нет избранных коллекций</p>
          <p>Нажмите на сердечко 🤍 на карточке, чтобы добавить</p>
          <Link to="/" className="favorites-empty__link">
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <>
          <div className="card-build__info">
            <span>Всего избранных: {favorites.length}</span>
          </div>
          <ul className="card__wrapper">
            {favorites.map((card) => (
              <li key={card.id}>
                <div className="card__body" style={{ position: 'relative' }}>
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
        </>
      )}
    </div>
  );
}