import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getMenuStructure } from "../api/catalog";
import "./NavBar.css";

const setActive = ({ isActive }) =>
  `menu__link ${isActive ? "menu__link_active" : ""}`;

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);

  // ===== Загрузка структуры меню из Supabase =====
  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await getMenuStructure();
        setMenuData(data);
      } catch (error) {
        console.error("Ошибка загрузки меню:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMenu();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // ===== Категории и их отображение =====
  const categoryNames = {
    Plitka: "Керамическая плитка",
    Keramogranit: "Керамогранит",
    GibkyMramor: "Гибкий мрамор",
  };

  // Сортируем категории в нужном порядке
  const categoryOrder = ["Plitka", "Keramogranit", "GibkyMramor"];

  // ===== Рендер ссылки на производителя =====
  const renderBrandLink = (category, brand) => {
    const encodedBrand = encodeURIComponent(brand);
    return (
      <NavLink
        key={`${category}-${brand}`}
        to={`/${category}/${encodedBrand}`}
        className={setActive}
        onClick={closeMenu}
      >
        {brand}
      </NavLink>
    );
  };

  if (loading) {
    return (
      <nav className="menu menu--loading">
        <span className="menu__loader">Загрузка...</span>
      </nav>
    );
  }

  return (
    <>
      {/* Бургер-кнопка */}
      <button
        className={`menu__burger ${isMenuOpen ? "menu__burger--active" : ""}`}
        onClick={toggleMenu}
        aria-label="Меню"
      >
        <span className="menu__burger-line"></span>
        <span className="menu__burger-line"></span>
        <span className="menu__burger-line"></span>
      </button>

      <nav className={`menu ${isMenuOpen ? "menu--open" : ""}`}>
        <NavLink to="/" className={setActive} onClick={closeMenu}>
          Главная
        </NavLink>

        {/* Динамические категории */}
        {categoryOrder.map((categoryKey) => {
          const brands = menuData[categoryKey] || [];
          const displayName = categoryNames[categoryKey] || categoryKey;

          // Если в категории нет производителей — не показываем
          if (brands.length === 0) return null;

          return (
            <div key={categoryKey} className="dropdown">
              <NavLink
                to={`/${categoryKey}`}
                className={({ isActive }) =>
                  `menu__link ${isActive ? "menu__link_active" : ""}`
                }
                onClick={closeMenu}
              >
                {displayName}
              </NavLink>
              <div className="dropdown-content">
                {brands.map((brand) => renderBrandLink(categoryKey, brand))}
              </div>
            </div>
          );
        })}

        <NavLink to="/AboutUs" className={setActive} onClick={closeMenu}>
          Как нас найти
        </NavLink>
      </nav>
    </>
  );
}

export default NavBar;