import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo_ceramic-ok/logo_vok_ceramic_white_gold.png";
import "./Header.css";
import NavBar from "./NavBar";
import VkLogo from "../images/Vk-header.svg"

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} className="header__logo" alt="logo" />
      </Link>
      <div>
      <Link to="/AboutUs" className="header__decor">
        <p className="header__text">Самара, ул. Красноармейская, 124</p>
      </Link>
    
        <p className="header__text">8 917 154 17 09</p>
      
      <div className="decor">
        <img src={VkLogo} className="footer__icon" alt="VkLogo" />
        <a
         href="https://vk.com/vokceramic/"
          className="header__text"
          target="_blank"
          rel="noopener noreferrer"
        >
          vokceramic.ru
        </a>
      </div>
      
        <p className="header__text">vokceramic@mail.ru</p>
      
      </div>
      <NavBar />
    </header>
  );
}

export default Header;
