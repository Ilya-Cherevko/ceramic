// src/context/FavoritesContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // ===== Загрузка из localStorage =====
  const loadFavorites = () => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
          return;
        }
      } catch (e) {
        console.warn('Ошибка парсинга избранного:', e);
      }
    }
    setFavorites([]);
  };

  // Загружаем при монтировании
  useEffect(() => {
    loadFavorites();
  }, []);

  // ===== Синхронизация между вкладками =====
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'favorites') {
        console.log('🔄 Синхронизация избранного из другой вкладки');
        loadFavorites();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addFavorite = (item) => {
    if (!item || !item.id) return;
    setFavorites(prev => {
      if (prev.some(fav => fav.id === item.id)) return prev;
      const newFavorites = [...prev, item];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const removeFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(item => item.id !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const toggleFavorite = (item) => {
    if (!item || !item.id) return;
    setFavorites(prev => {
      const exists = prev.some(fav => fav.id === item.id);
      let newFavorites;
      if (exists) {
        newFavorites = prev.filter(fav => fav.id !== item.id);
      } else {
        newFavorites = [...prev, item];
      }
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (id) => {
    if (!id) return false;
    return favorites.some(item => item.id === id);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
      count: favorites.length,
      refreshFavorites: loadFavorites,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};