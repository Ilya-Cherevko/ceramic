// src/Components/FavoriteButton.jsx
import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import './FavoriteButton.css';

const FavoriteButton = ({ item }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  // Для отладки
  console.log('🔍 FavoriteButton рендерится, favorites:', useFavorites().favorites.map(f => f.id));
  console.log('🔍 Проверяем id:', item?.id, 'isFavorite:', isFavorite(item?.id));

  const liked = isFavorite(item?.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🖱️ КЛИК ПО КНОПКЕ!');
    console.log('🖱️ item.id:', item?.id);
    console.log('🖱️ item.collection:', item?.collection);
    console.log('🖱️ toggleFavorite вызывается с item:', item);
    toggleFavorite(item);
  };

  return (
    <button
      className={`favorite-button ${liked ? 'favorite-button--active' : ''}`}
      onClick={handleClick}
      aria-label={liked ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      {liked ? '❤️' : '🤍'}
    </button>
  );
};

export default FavoriteButton;