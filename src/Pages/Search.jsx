// src/Pages/Search.jsx
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "../utils/supabase";
import Breadcrumbs from "../Components/Breadcrumbs";
import "../Components/card__wrapper.css";
import "../Components/Card.css";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const loadMoreCount = 8;

  useEffect(() => {
    const search = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const searchTerm = query.trim();

        const { data, error } = await supabase
          .from("catalog")
          .select("*")
          .or(
            `collection.ilike.%${searchTerm}%, ` +
            `name.ilike.%${searchTerm}%, ` +
            `country.ilike.%${searchTerm}%, ` +
            `category.ilike.%${searchTerm}%`
          )
          .order("collection", { ascending: true });

        if (error) throw error;

        // Сортируем по релевантности
        const sorted = (data || []).sort((a, b) => {
          const aCollection = a.collection?.toLowerCase() || "";
          const bCollection = b.collection?.toLowerCase() || "";
          const searchLower = searchTerm.toLowerCase();

          const aExact = aCollection === searchLower ? 3 : 0;
          const bExact = bCollection === searchLower ? 3 : 0;

          const aStarts = aCollection.startsWith(searchLower) ? 2 : 0;
          const bStarts = bCollection.startsWith(searchLower) ? 2 : 0;

          const aContains = aCollection.includes(searchLower) ? 1 : 0;
          const bContains = bCollection.includes(searchLower) ? 1 : 0;

          const aScore = aExact + aStarts + aContains;
          const bScore = bExact + bStarts + bContains;

          return bScore - aScore;
        });

        setResults(sorted);
        setVisibleCount(8);
      } catch (error) {
        console.error("Ошибка поиска:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const visibleResults = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + loadMoreCount);
  };

  const getImageUrl = (image) => {
    if (Array.isArray(image) && image.length > 0) {
      return image[0];
    }
    if (typeof image === "string") {
      return image;
    }
    return "/images/placeholder.jpg";
  };

  const highlightText = (text, query) => {
    if (!text || !query.trim()) return text;

    const parts = text.split(new RegExp(`(${query.trim()})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.trim().toLowerCase() ? (
        <mark key={i} className="search-highlight">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const getMatchInfo = (card, query) => {
    const searchLower = query.trim().toLowerCase();
    const matches = [];

    if (card.collection?.toLowerCase().includes(searchLower)) {
      matches.push("коллекция");
    }
    if (card.name?.toLowerCase().includes(searchLower)) {
      matches.push("производитель");
    }
    if (card.country?.toLowerCase().includes(searchLower)) {
      matches.push("страна");
    }
    if (card.category?.toLowerCase().includes(searchLower)) {
      matches.push("категория");
    }

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
          <button
            className="search-bar__clear"
            onClick={() => setSearchParams({})}
          >
            ✕
          </button>
        )}
      </div>

      {loading ? (
        <div className="load-more__loader">
          <div className="load-more__spinner"></div>
          <p>Поиск...</p>
        </div>
      ) : query && results.length === 0 ? (
        <div className="search-empty">
          <p>😕 Ничего не найдено по запросу</p>
          <p className="search-empty__query">«{query}»</p>
          <p>Попробуйте изменить запрос</p>
        </div>
      ) : query && results.length > 0 ? (
        <>
          <div className="card-build__info">
            <span>
              Найдено {results.length}{" "}
              {results.length === 1 ? "коллекция" : "коллекций"}
            </span>
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
                    <Link
                      to={`/${card.category}/${card.name}`}
                      className="card__name"
                    >
                      {highlightText(card.name, query)}
                    </Link>
                    <p className="card__country">
                      {highlightText(card.country, query)}
                    </p>
                    {matchInfo && (
                      <p className="card__match-info">
                        🔍 Найдено в: {matchInfo}
                      </p>
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
          <p className="search-empty__hint">
            Например: «Adelia», «Alma Ceramica», «Россия»
          </p>
        </div>
      )}
    </div>
  );
}