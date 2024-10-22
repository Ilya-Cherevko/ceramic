import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import Home from "../images/Home.svg"
import Phone from "../images/Phone.svg"
import VkLogo from "../images/Vk.svg"
import Mail from "../images/Mail.svg"

function Footer() {
  return (
    <div className="footer">
      <Link to="/AboutUs" className="decor">
        <img src={Home} className="footer__icon" alt="Home" />
        <p className="text">Самара, ул. Красноармейская, 124</p>
      </Link>
      <div className="decor">
        <img src={Phone} className="footer__icon" alt="Phone" />
        <p className="text">8 917 154 17 09</p>
      </div>
      <div className="decor">
        <img src={VkLogo} className="footer__icon" alt="VkLogo" />
        <a
         href="https://vk.com/vokceramic/"
          className="text"
          target="_blank"
          rel="noopener noreferrer"
        >
          vokceramic.ru
        </a>
      </div>
      <div className="decor">
        <img src={Mail} className="footer__icon" alt="Mail" />
        <p className="text">vokceramic@mail.ru</p>
      </div>
    </div>
  );
}

export default Footer;
