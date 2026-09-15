// src/Components/FavoriteButton.jsx
import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import './FavoriteButton.css';

const FavoriteButton = ({ item }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  const liked = isFavorite(item?.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
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