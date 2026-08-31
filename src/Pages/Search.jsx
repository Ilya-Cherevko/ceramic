// src/Pages/Search.jsx
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSearch } from "../hooks/useCatalog";
import Breadcrumbs from "../Components/Breadcrumbs";
import "../Components/card__wrapper.css";
import "../Components/Card.css";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [visibleCount, setVisibleCount] = useState(8);
  const loadMoreCount = 8;

  // ===== Используем React Query для поиска =====
  const { data: results = [], isLoading } = useSearch(query);

  // ===== Пагинация =====
  const visibleResults = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + loadMoreCount);
  };

  const getImageUrl = (image) => {
    if (Array.isArray(image) && image.length > 0) return image[0];
    if (typeof image === "string") return image;
    return "/images/placeholder.jpg";
  };

  // ===== Подсветка найденного =====
  const highlightText = (text, query) => {
    if (!text || !query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.trim()})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.trim().toLowerCase() ? (
        <mark key={i} className="search-highlight">{part}</mark>
      ) : (
        part
      )
    );
  };

  const getMatchInfo = (card, query) => {
    const searchLower = query.trim().toLowerCase();
    const matches = [];
    if (card.collection?.toLowerCase().includes(searchLower)) matches.push("коллекция");
    if (card.name?.toLowerCase().includes(searchLower)) matches.push("производитель");
    if (card.country?.toLowerCase().includes(searchLower)) matches.push("страна");
    if (card.category?.toLowerCase().includes(searchLower)) matches.push("категория");
    return matches.length > 0 ? matches.join(", ") : null;
  };

  return (
    <div className="card-build">
      <Breadcrumbs />
      <h1 className="card-build__title">🔍 Поиск</h1>

      <div className="search-bar">
        <input
          type="text"
          className="search-bar__input"
          placeholder="Поиск по коллекциям, производителям, странам..."
          value={query}
          onChange={(e) => setSearchParams({ q: e.target.value })}
          autoFocus
        />
        {query && (
          <button className="search-bar__clear" onClick={() => setSearchParams({})}>
            ✕
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="load-more__loader">
          <div className="load-more__spinner"></div>
          <p>Поиск...</p>
        </div>
      ) : query && results.length === 0 ? (
        <div className="search-empty">
          <p>😕 Ничего не найдено по запросу</p>
          <p className="search-empty__query">«{query}»</p>
        </div>
      ) : query && results.length > 0 ? (
        <>
          <div className="card-build__info">
            <span>Найдено {results.length} {results.length === 1 ? "коллекция" : "коллекций"}</span>
            <span className="search-query">по запросу «{query}»</span>
          </div>
          <ul className="card__wrapper">
            {visibleResults.map((card) => {
              const matchInfo = getMatchInfo(card, query);
              return (
                <li key={card.id}>
                  <div className="card__body">
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
                      {highlightText(card.collection, query)}
                    </Link>
                    <Link to={`/${card.category}/${card.name}`} className="card__name">
                      {highlightText(card.name, query)}
                    </Link>
                    <p className="card__country">{highlightText(card.country, query)}</p>
                    {matchInfo && (
                      <p className="card__match-info">🔍 Найдено в: {matchInfo}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          {hasMore && (
            <div className="load-more">
              <button className="load-more__button" onClick={loadMore}>
                Загрузить ещё ({visibleCount} из {results.length})
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="search-empty">
          <p>🔍 Введите запрос для поиска</p>
          <p className="search-empty__hint">Например: «Adelia», «Alma Ceramica», «Россия»</p>
        </div>
      )}
    </div>
  );
}