import React, { useEffect } from "react";
import "./ImagePopup.css";

function ImagePopup({ card, onClose }) {
  // Закрытие по Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
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
    >
      <div className="popup__container">
        <button 
          className="popup__close" 
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>
        
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
          </>
        ) : (
          <div className="popup__error">Изображение не найдено</div>
        )}
      </div>
    </div>
  );
}

export default ImagePopup;