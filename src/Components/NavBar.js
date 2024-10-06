import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="menu">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `menu__link ${isActive ? "menu__link_active" : ""}`
        }
      >
        Главная
      </NavLink>

      <NavLink
        to="/plitka"
        className={({ isActive }) =>
          `menu__link ${isActive ? "menu__link_active" : ""}`
        }
      >
        <div className="dropdown">
          <div>Керамическая плитка</div>
          <div className="dropdown-content">
            <NavLink
              to="/plitka/Azori"
              className={({ isActive }) =>
                `menu__link ${isActive ? "menu__link_active" : ""}`
              }
            >
              Азори
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
            <NavLink
              to="/keramogranit/Estima"
              className={({ isActive }) =>
                `menu__link ${isActive ? "menu__link_active" : ""}`
              }
            >
              Эстима
            </NavLink>
          </div>
        </div>
      </NavLink>

      <NavLink
        to="/AboutUs"
        className={({ isActive }) =>
          `menu__link ${isActive ? "menu__link_active" : ""}`
        }
      >
        Как нас найти
      </NavLink>
    </nav>
  );
}

export default NavBar;
