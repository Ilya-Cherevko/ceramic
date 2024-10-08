import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const setActive = ({ isActive }) =>
  `menu__link ${isActive ? "menu__link_active" : ""}`;

function NavBar() {
  return (
    <nav className="menu">
      <NavLink to="/" className={setActive}>
        Главная
      </NavLink>

      <NavLink to="/plitka" className={setActive}>
        <div className="dropdown">
          <div>Керамическая плитка</div>
          <div className="dropdown-content">
            <NavLink to="/plitka/Alma%20Ceramica" className={setActive}>
              Алма Керамика
            </NavLink>
            <NavLink to="/plitka/Azori" className={setActive}>
              Азори
            </NavLink>
            <NavLink to="/plitka/Eletto_ceramica" className={setActive}>
              Элетто Керамика
            </NavLink>
            <NavLink to="/plitka/LB%20Ceramics" className={setActive}>
              LB Ceramics
            </NavLink>
            <NavLink to="/plitka/NewTrend" className={setActive}>
              NewTrend
            </NavLink>
          </div>
        </div>
      </NavLink>

      <NavLink
        to="/keramogranit"
        className={({ isActive }) =>
          `menu__link ${isActive ? "menu__link_active" : ""}`
        }
      >
        <div className="dropdown">
          <div>Керамогранит</div>
          <div className="dropdown-content">
            <NavLink to="/keramogranit/Estima" className={setActive}>
              Эстима
            </NavLink>
            <NavLink to="/keramogranit/absolut_gres" className={setActive}>
              Абсолют Гресс
            </NavLink>
            <NavLink to="/keramogranit/Alma%20Ceramica" className={setActive}>
              Алма Керамика
            </NavLink>
            <NavLink
              to="/keramogranit/Ametis%20by%20Estima"
              className={setActive}
            >
              Аetist by Estima
            </NavLink>
            <NavLink to="/keramogranit/Bluezone" className={setActive}>
              Bluezone
            </NavLink>
            <NavLink to="/keramogranit/Delacora" className={setActive}>
              Delacora
            </NavLink>
            <NavLink to="/keramogranit/Estima" className={setActive}>
              Estima
            </NavLink>
            <NavLink to="/keramogranit/Estima_city" className={setActive}>
              Estima City
            </NavLink>
            <NavLink to="/keramogranit/Гранитея" className={setActive}>
              Гранитея
            </NavLink>
            <NavLink to="/keramogranit/Gresse" className={setActive}>
              Gresse
            </NavLink>
            <NavLink to="/keramogranit/Керлайф" className={setActive}>
              Керлайф
            </NavLink>
            <NavLink to="/keramogranit/LCM" className={setActive}>
              LCM
            </NavLink>
            <NavLink to="/keramogranit/Primavera" className={setActive}>
              Primavera
            </NavLink>
          </div>
        </div>
      </NavLink>

      <NavLink to="/AboutUs" className={setActive}>
        Как нас найти
      </NavLink>
    </nav>
  );
}

export default NavBar;
