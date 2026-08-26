// src/Components/Skeletons.jsx
import React from "react";
import "./Skeletons.css";

// ===== Скелетон для карточек каталога (CardBuild / Category) =====
export const CardSkeleton = ({ count = 8 }) => {
  return (
    <div className="card__wrapper skeleton-grid">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="card__body skeleton-card">
          <div className="skeleton-card__image"></div>
          <div className="skeleton-card__title"></div>
          <div className="skeleton-card__text"></div>
          <div className="skeleton-card__text short"></div>
        </div>
      ))}
    </div>
  );
};

// ===== Скелетон для детальной страницы (CardPit) =====
export const CardPitSkeleton = () => {
  return (
    <div className="card__body_one skeleton-detail">
      <div className="skeleton-detail__image"></div>
      <div className="skeleton-detail__info">
        <div className="skeleton-detail__title"></div>
        <div className="skeleton-detail__text"></div>
        <div className="skeleton-detail__text"></div>
        <div className="skeleton-detail__thumbnails">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton-detail__thumbnail"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===== Скелетон для списка производителей (Category) =====
export const CategorySkeleton = ({ count = 8 }) => {
  return (
    <div className="category-page__list skeleton-category">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="category-page__item skeleton-category__item">
          <div className="skeleton-category__link"></div>
        </div>
      ))}
    </div>
  );
};