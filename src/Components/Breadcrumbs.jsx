// src/Components/Breadcrumbs.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.css";

// Маппинг категорий на русские названия
const categoryNames = {
  Plitka: "Керамическая плитка",
  Keramogranit: "Керамогранит",
  GibkyMramor: "Гибкий мрамор",
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Если на главной — не показываем
  if (pathnames.length === 0) {
    return null;
  }

  // Декодируем URL-параметры (для кириллицы)
  const decodedPathnames = pathnames.map((segment) =>
    decodeURIComponent(segment)
  );

  // Строим хлебные крошки
  const breadcrumbs = decodedPathnames.map((name, index) => {
    // Формируем путь для ссылки
    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

    // Определяем отображаемое имя
    let displayName = name;

    // Если это категория — показываем русское название
    if (categoryNames[name]) {
      displayName = categoryNames[name];
    }

    // Если это последний элемент — он активный (без ссылки)
    const isLast = index === decodedPathnames.length - 1;

    // Красивое форматирование для коллекций
    if (index === 2 && categoryNames[decodedPathnames[0]]) {
      // Это страница коллекции — показываем "Коллекция: Название"
      displayName = `Коллекция: ${name}`;
    }

    return {
      name: displayName,
      route: routeTo,
      isLast,
    };
  });

  return (
    <nav className="breadcrumbs" aria-label="Хлебные крошки">
      <ol className="breadcrumbs__list">
        {/* Главная */}
        <li className="breadcrumbs__item">
          <Link to="/" className="breadcrumbs__link">
            🏠 Главная
          </Link>
          <span className="breadcrumbs__separator">/</span>
        </li>

        {/* Остальные элементы */}
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="breadcrumbs__item">
            {crumb.isLast ? (
              <span className="breadcrumbs__current">{crumb.name}</span>
            ) : (
              <>
                <Link to={crumb.route} className="breadcrumbs__link">
                  {crumb.name}
                </Link>
                <span className="breadcrumbs__separator">/</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;