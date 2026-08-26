// src/Pages/CardPit.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getCollectionByCollection } from "../api/catalog";
import Breadcrumbs from "../Components/Breadcrumbs";
import { CardPitSkeleton } from "../Components/Skeletons";
import SEO from "../Components/SEO";
import "../Components/card__wrapper.css";
import "../Components/Card.css";
import ImagePopup from "../Components/ImagePopup";
import { SITE_URL } from "../config";

export default function CardPit() {
  const { Collection } = useParams();
  const location = useLocation();
  const scrollRef = useRef(null);

  // ===== Состояния =====
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    image: null,
    name: "",
    collection: "",
  });
  const [mainImage, setMainImage] = useState(null);
  const [activeId, setActiveId] = useState(0);

  // Ключи для localStorage
  const storageKeyActive = `cardPit_activeSlide_${Collection}`;
  const storageKeyScroll = `cardPit_scrollPosition_${Collection}`;

  // ===== Загрузка данных из Supabase =====
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getCollectionByCollection(Collection);
        setCard(data);

        if (data && data.interiors && data.interiors.length > 0) {
          const saved = localStorage.getItem(storageKeyActive);
          const savedActive = saved ? parseInt(saved, 10) : 0;
          const validIndex = Math.min(savedActive, data.interiors.length - 1);
          setActiveId(validIndex);
          setMainImage(data.interiors[validIndex]);
        }
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        setCard(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [Collection, storageKeyActive]);

  // ===== Сохранение активного слайда =====
  useEffect(() => {
    if (card && mainImage) {
      localStorage.setItem(storageKeyActive, String(activeId));
    }
  }, [activeId, storageKeyActive, card, mainImage]);

  // ===== Восстановление позиции скролла =====
  useEffect(() => {
    if (card) {
      const savedScroll = localStorage.getItem(storageKeyScroll);
      if (savedScroll && scrollRef.current) {
        setTimeout(() => {
          window.scrollTo({
            top: parseInt(savedScroll, 10),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, [storageKeyScroll, card]);

  // ===== Сохранение позиции скролла =====
  useEffect(() => {
    if (!card) return;

    const handleBeforeUnload = () => {
      localStorage.setItem(storageKeyScroll, String(window.scrollY));
    };

    const handleScroll = () => {
      localStorage.setItem(storageKeyScroll, String(window.scrollY));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [storageKeyScroll, card]);

  // ===== Функция замены главного изображения =====
  const changeMainImage = (image, index) => {
    setMainImage(image);
    setActiveId(index);
    localStorage.setItem(storageKeyActive, String(index));
  };

  // ===== Если коллекция не найдена =====
  if (loading) {
    return (
      <article className="card__page">
        <Breadcrumbs />
        <CardPitSkeleton />
      </article>
    );
  }

  if (!card) {
    return (
      <div className="card-pit__empty">
        <h2>Коллекция не найдена</h2>
        <p>Извините, но коллекция "{Collection}" не найдена в каталоге.</p>
        <button
          className="card-pit__back-btn"
          onClick={() => window.history.back()}
        >
          ← Вернуться назад
        </button>
      </div>
    );
  }

  // ===== Функции для поп-апа =====
  function closeAllPopups() {
    setSelectedCard({
      isOpen: false,
      image: null,
      name: "",
      collection: "",
    });
    localStorage.setItem(storageKeyActive, String(activeId));
  }

  function handleMainImageClick() {
    if (!mainImage) return;
    setSelectedCard({
      isOpen: true,
      image: mainImage,
      name: card.name || "Изображение",
      collection: card.collection || "",
    });
    localStorage.setItem(storageKeyActive, String(activeId));
  }

  function handleTovarClick(image, cardData) {
    setSelectedCard({
      isOpen: true,
      image: image,
      name: cardData.name || "Товар",
      collection: cardData.collection || "",
    });
    localStorage.setItem(storageKeyActive, String(activeId));
  }

  const getImageUrl = (image) => {
    if (Array.isArray(image) && image.length > 0) {
      return image[0];
    }
    if (typeof image === "string") {
      return image;
    }
    return "/images/placeholder.jpg";
  };

  const formatSize = (size) => {
    if (Array.isArray(size)) {
      return size.join(", ");
    }
    return size || "Не указан";
  };

  // ===== Рендеринг =====
  return (
    <article className="card__page" ref={scrollRef}>
      <SEO
        title={`${card.collection} — ${card.name} | VOK Ceramic`}
        description={`Коллекция ${card.collection} от ${card.name}. Размеры: ${formatSize(card.size)}. Страна производства: ${card.country}.`}
        image={mainImage || getImageUrl(card.interiors)}
        url={`${SITE_URL}${location.pathname}`}
      />
      <Breadcrumbs />
      <div className="card__body_one">
        {/* Главное изображение */}
        <div className="card__image-wrapper">
          <img
            className="card__img_card"
            src={mainImage || getImageUrl(card.interiors)}
            alt={card.name}
            onClick={handleMainImageClick}
            style={{ cursor: "pointer" }}
          />

          {card.interiors && card.interiors.length > 1 && (
            <div className="card__image-counter">
              {activeId + 1} / {card.interiors.length}
            </div>
          )}
        </div>

        <div className="card__img-interior">
          {/* Информация о коллекции */}
          <div className="card__conteiner">
            <p className="card__collection">Коллекция: {card.collection}</p>
            <p className="card__name">Производитель: {card.name}</p>
            <p className="card__country">Страна производства: {card.country}</p>
            <p className="card__country">Размеры: {formatSize(card.size)}</p>
          </div>

          {/* Миниатюры interiors */}
          {card.interiors && card.interiors.length > 0 && (
            <div className="card__thumbnails-wrapper">
              <h4 className="card__thumbnails-title">Интерьеры:</h4>
              <ul className="card__img-interiors">
                {card.interiors.map((image, idx) => (
                  <li
                    key={idx}
                    className={`card__img_tovars ${idx === activeId ? "active" : ""}`}
                    onClick={() => changeMainImage(image, idx)}
                  >
                    <img
                      className="card__img_interiors"
                      src={image}
                      alt={`${card.name} - ${idx + 1}`}
                      style={{ cursor: "pointer" }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Товары */}
      {card.tovars && card.tovars.length > 0 && (
        <div className="card__tovars-wrapper">
          <h3 className="card__tovars-title">Товары в коллекции:</h3>
          <ul className="card__wrapper-tovars">
            {card.tovars.map((tovar, idx) => (
              <li key={idx} className="card__body">
                <img
                  className="card__img_tovar"
                  src={tovar}
                  alt={card.name}
                  onClick={() => handleTovarClick(tovar, card)}
                  style={{ cursor: "pointer" }}
                />
                <p className="card__collection">{card.collection}</p>
                <p className="card__name">{card.name}</p>
                <p className="card__country">{formatSize(card.size)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Попап */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </article>
  );
}