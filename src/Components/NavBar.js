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

      <NavLink to="/Plitka" className={setActive}>
        <div className="dropdown">
          Керамическая плитка
          <div className="dropdown-content">
            <NavLink to="/Plitka/Alma%20Ceramica" className={setActive}>
              Alma Ceramica
            </NavLink>
            <NavLink to="/Plitka/Azori" className={setActive}>
              Azori
            </NavLink>
            <NavLink to="/Plitka/Eletto%20ceramica" className={setActive}>
              Eletto Ceramica
            </NavLink>
            <NavLink to="/Plitka/LB%20Ceramics" className={setActive}>
              LB Ceramics
            </NavLink>
            <NavLink to="/Plitka/NewTrend" className={setActive}>
              NewTrend
            </NavLink>
          </div>
        </div>
      </NavLink>

      <NavLink to="/Keramogranit" className={setActive}>
        <div className="dropdown">
          Керамогранит
          <div className="dropdown-content">
            <NavLink to="/Keramogranit/Absolut%20gres" className={setActive}>
              Absolut Gres
            </NavLink>
            <NavLink to="/Keramogranit/Alma%20Ceramica" className={setActive}>
              Alma Ceramica
            </NavLink>
            <NavLink
              to="/Keramogranit/Ametis%20by%20Estima"
              className={setActive}
            >
              Аmetist by Estima
            </NavLink>
            <NavLink to="/Keramogranit/Bluezone" className={setActive}>
              Bluezone
            </NavLink>
            <NavLink to="/Keramogranit/Delacora" className={setActive}>
              Delacora
            </NavLink>
            <NavLink to="/Keramogranit/Estima" className={setActive}>
              Estima
            </NavLink>
            <NavLink to="/Keramogranit/Estima%20city" className={setActive}>
              Estima City
            </NavLink>
            <NavLink to="/Keramogranit/Гранитея" className={setActive}>
              Гранитея
            </NavLink>
            <NavLink to="/Keramogranit/Gresse" className={setActive}>
              Gresse
            </NavLink>
            <NavLink to="/Keramogranit/Керлайф" className={setActive}>
              Керлайф
            </NavLink>
            <NavLink to="/Keramogranit/LCM" className={setActive}>
              LCM
            </NavLink>
            <NavLink to="/Keramogranit/Primavera" className={setActive}>
              Primavera
            </NavLink>
          </div>
        </div>
      </NavLink>

      <NavLink to="/GibkyMramor" className={setActive}>
        <div className="dropdown">
          Гибкий мрамор
          <div className="dropdown-content">
            <NavLink to="/GibkyMramor/Elite" className={setActive}>
              Elite
            </NavLink>
            <NavLink to="/GibkyMramor/Exclusive" className={setActive}>
              Exclusive
            </NavLink>
            <NavLink to="/GibkyMramor/VIP" className={setActive}>
              Vip
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
