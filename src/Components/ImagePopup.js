// src/Components/ImagePopup.jsx
import React, { useEffect, useRef } from "react";
import "./ImagePopup.css";

function ImagePopup({ card, onClose, onNavigate, hasMultiple = false }) {
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const touchEndX = useRef(null);
  const touchEndY = useRef(null);

  // Закрытие по Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (card.isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [card.isOpen, onClose]);

  // ===== Навигация с клавиатуры =====
  useEffect(() => {
    if (!card.isOpen || !onNavigate || !hasMultiple) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") onNavigate("prev");
      if (e.key === "ArrowRight") onNavigate("next");
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [card.isOpen, onNavigate, hasMultiple]);

  // ===== Свайп =====
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
    touchStartY.current = e.changedTouches[0].screenY;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    touchEndY.current = e.changedTouches[0].screenY;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null ||
      touchEndX.current === null ||
      touchEndY.current === null
    ) {
      return;
    }

    const deltaX = touchStartX.current - touchEndX.current;
    const deltaY = touchStartY.current - touchEndY.current;

    // Игнорируем, если свайп больше вертикальный
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      resetTouch();
      return;
    }

    const minSwipeDistance = 50;

    if (!onNavigate || !hasMultiple) {
      resetTouch();
      return;
    }

    // Свайп влево — следующая
    if (deltaX > minSwipeDistance) {
      onNavigate("next");
    }
    // Свайп вправо — предыдущая
    else if (deltaX < -minSwipeDistance) {
      onNavigate("prev");
    }

    resetTouch();
  };

  const resetTouch = () => {
    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  // Закрытие по клику на оверлей
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!card.isOpen) return null;

  return (
    <div
      className={`popup ${card.isOpen ? "popup_opened" : ""}`}
      onClick={handleOverlayClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>

        {/* Стрелки (только если есть несколько картинок) */}
        {hasMultiple && onNavigate && (
          <>
            <button
              className="popup__nav popup__nav--prev"
              onClick={() => onNavigate("prev")}
              aria-label="Предыдущее изображение"
            >
              ‹
            </button>
            <button
              className="popup__nav popup__nav--next"
              onClick={() => onNavigate("next")}
              aria-label="Следующее изображение"
            >
              ›
            </button>
          </>
        )}

        {card.image ? (
          <>
            <img
              className="popup__image"
              src={card.image}
              alt={card.name || "Изображение"}
              onError={(e) => {
                console.error("Ошибка загрузки изображения:", card.image);
                e.target.src = "/images/placeholder.jpg";
                e.target.alt = "Изображение не найдено";
              }}
            />
            {card.name && (
              <p className="popup__caption">
                {card.name}
                {card.collection && ` — ${card.collection}`}
              </p>
            )}

            {/* Счётчик (например, 2 / 5) */}
            {card.currentIndex !== undefined && card.totalCount !== undefined && (
              <p className="popup__counter">
                {card.currentIndex + 1} / {card.totalCount}
              </p>
            )}
          </>
        ) : (
          <div className="popup__error">Изображение не найдено</div>
        )}
      </div>
    </div>
  );
}

export default ImagePopup;