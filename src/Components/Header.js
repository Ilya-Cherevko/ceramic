// src/Components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import logo from "../images/logo_ceramic-ok/logo_vok_ceramic_white_gold.png";
import "./Header.css";
import NavBar from "./NavBar";
import VkLogo from "../images/Vk logo white.svg";

function Header() {
  const { count } = useFavorites();  // ← добавить эту строку

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} className="header__logo" alt="logo" />
      </Link>
      <div className="header__adres">
        <Link to="/AboutUs" className="header__decor">
          <p className="header__text">Самара, ул. Красноармейская, 124</p>
        </Link>
        <p className="header__text">8 917 154 17 09</p>
        <div className="header__decor">
          <img src={VkLogo} className="footer__icon" alt="VkLogo" />
          <a
            href="https://vk.com/vokceramic/"
            className="header__text"
            target="_blank"
            rel="noopener noreferrer"
          >
            vokceramic.ru
          </a>
          <p className="header__text">vokceramic@mail.ru</p>
        </div>
      </div>
      <div className="header__favorites">
        <Link to="/favorites" className="header__favorites-link">
          ⭐ {count > 0 && <span className="header__favorites-count">{count}</span>}
        </Link>
      </div>
      <div className="header__search">
  <Link to="/search" className="header__search-link">
    🔍
  </Link>
</div>
      <NavBar />
    </header>
  );
}

export default Header;