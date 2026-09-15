// src/Components/Slider/Slider.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useFeaturedCollections } from "../../hooks/useCatalog";
import "./Slider.css";

const AUTO_PLAY_INTERVAL = 6000;

export default function Slider() {
  const { data: slides = [], isLoading } = useFeaturedCollections();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const autoPlayRef = useRef(null);

  // ===== Автопрокрутка =====
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [slides.length, isPaused]);

  // ===== Сброс индекса, если слайдов стало меньше =====
  useEffect(() => {
    if (activeIndex >= slides.length && slides.length > 0) {
      setActiveIndex(0);
    }
  }, [slides.length, activeIndex]);

  // ===== Навигация =====
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // ===== Свайп =====
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
    setIsPaused(false);
  };

  const handleSwipe = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // ===== Пауза при наведении =====
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // ===== Изображение =====
  const getImageUrl = (image) => {
    if (Array.isArray(image) && image.length > 0) return image[0];
    if (typeof image === "string") return image;
    return "/images/placeholder.jpg";
  };

  // ===== Заглушка во время загрузки =====
  if (isLoading) {
    return (
      <div className="slider-wrap">
        <div className="slider-skeleton"></div>
      </div>
    );
  }

  // ===== Если нет избранных коллекций =====
  if (slides.length === 0) {
    return (
      <div className="slider-wrap slider-wrap--empty">
        <div className="slider-empty">
          <p>🎨 Здесь скоро появятся лучшие коллекции</p>
          <p className="slider-empty__hint">
            Отметьте коллекции в админ-панели галочкой «Показывать в слайдере»
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="slider-wrap"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ===== Слайды ===== */}
      <div className="slider-container">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="slider-slide">
              <Link
                to={`/${slide.category}/${slide.name}/${slide.collection}`}
                className="slider-slide__link"
              >
                <img
                  src={getImageUrl(slide.interiors)}
                  alt={slide.collection}
                  className="slider-slide__image"
                  loading="lazy"
                />
                <div className="slider-slide__overlay">
                  <h3 className="slider-slide__title">{slide.collection}</h3>
                  <p className="slider-slide__subtitle">{slide.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Кнопки навигации ===== */}
      {slides.length > 1 && (
        <>
          <button
            className="slider-btn slider-btn--prev"
            onClick={prevSlide}
            aria-label="Предыдущий слайд"
          >
            ‹
          </button>
          <button
            className="slider-btn slider-btn--next"
            onClick={nextSlide}
            aria-label="Следующий слайд"
          >
            ›
          </button>
        </>
      )}

      {/* ===== Индикаторы ===== */}
      {slides.length > 1 && (
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === activeIndex ? "slider-dot--active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}