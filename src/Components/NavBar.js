import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const setActive = ({ isActive }) =>
  `menu__link ${isActive ? "menu__link_active" : ""}`;

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (name) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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

      {/* Навигационное меню */}
      <nav className={`menu ${isMenuOpen ? "menu--open" : ""}`}>
        <NavLink to="/" className={setActive} onClick={closeMenu}>
          Главная
        </NavLink>

        {/* Керамическая плитка */}
        <div className="dropdown">
          <div 
            className="menu__link" 
            onClick={() => toggleDropdown("plitka")}
            style={{ cursor: "pointer" }}
          >
            Керамическая плитка
          </div>
          <div className={`dropdown-content ${openDropdowns.plitka ? "dropdown-content--open" : ""}`}>
            <NavLink to="/Plitka/Alma%20Ceramica" className={setActive} onClick={closeMenu}>
              Alma Ceramica
            </NavLink>
            <NavLink to="/Plitka/Azori" className={setActive} onClick={closeMenu}>
              Azori
            </NavLink>
            <NavLink to="/Plitka/Eletto%20Ceramica" className={setActive} onClick={closeMenu}>
              Eletto Ceramica
            </NavLink>
            <NavLink to="/Plitka/LB%20Ceramics" className={setActive} onClick={closeMenu}>
              LB Ceramics
            </NavLink>
            <NavLink to="/Plitka/NewTrend" className={setActive} onClick={closeMenu}>
              NewTrend
            </NavLink>
          </div>
        </div>

        {/* Керамогранит */}
        <div className="dropdown">
          <div 
            className="menu__link" 
            onClick={() => toggleDropdown("keramogranit")}
            style={{ cursor: "pointer" }}
          >
            Керамогранит
          </div>
          <div className={`dropdown-content ${openDropdowns.keramogranit ? "dropdown-content--open" : ""}`}>
            <NavLink to="/Keramogranit/Absolut%20Gres" className={setActive} onClick={closeMenu}>
              Absolut Gres
            </NavLink>
            <NavLink to="/Keramogranit/Alma%20Ceramica" className={setActive} onClick={closeMenu}>
              Alma Ceramica
            </NavLink>
            <NavLink to="/Keramogranit/Ametist%20by%20Estima" className={setActive} onClick={closeMenu}>
              Аmetist by Estima
            </NavLink>
            <NavLink to="/Keramogranit/Bluezone" className={setActive} onClick={closeMenu}>
              Bluezone
            </NavLink>
            <NavLink to="/Keramogranit/Delacora" className={setActive} onClick={closeMenu}>
              Delacora
            </NavLink>
            <NavLink to="/Keramogranit/Estima" className={setActive} onClick={closeMenu}>
              Estima
            </NavLink>
            <NavLink to="/Keramogranit/Estima%20City" className={setActive} onClick={closeMenu}>
              Estima City
            </NavLink>
            <NavLink to="/Keramogranit/Гранитея" className={setActive} onClick={closeMenu}>
              Гранитея
            </NavLink>
            <NavLink to="/Keramogranit/Gresse" className={setActive} onClick={closeMenu}>
              Gresse
            </NavLink>
            <NavLink to="/Keramogranit/Керлайф" className={setActive} onClick={closeMenu}>
              Керлайф
            </NavLink>
            <NavLink to="/Keramogranit/LCM" className={setActive} onClick={closeMenu}>
              LCM
            </NavLink>
            <NavLink to="/Keramogranit/Primavera" className={setActive} onClick={closeMenu}>
              Primavera
            </NavLink>
          </div>
        </div>

        {/* Гибкий мрамор */}
        <div className="dropdown">
          <div 
            className="menu__link" 
            onClick={() => toggleDropdown("mramor")}
            style={{ cursor: "pointer" }}
          >
            Гибкий мрамор
          </div>
          <div className={`dropdown-content ${openDropdowns.mramor ? "dropdown-content--open" : ""}`}>
            <NavLink to="/GibkyMramor/Elite" className={setActive} onClick={closeMenu}>
              Elite
            </NavLink>
            <NavLink to="/GibkyMramor/Exclusive" className={setActive} onClick={closeMenu}>
              Exclusive
            </NavLink>
            <NavLink to="/GibkyMramor/VIP" className={setActive} onClick={closeMenu}>
              Vip
            </NavLink>
          </div>
        </div>

        <NavLink to="/AboutUs" className={setActive} onClick={closeMenu}>
          Как нас найти
        </NavLink>
      </nav>
    </>
  );
}

export default NavBar;