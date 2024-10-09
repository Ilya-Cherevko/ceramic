import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div className="footer">
      <p className="text">Самара, ул. Красноармейская, 124</p>
      <p className="text">8 917 154 17 09</p>
      <a
        href="https://vk.com/vokceramic/"
        className="text"
        target="_blank"
        rel="noopener noreferrer"
      >
        Vokceramic
      </a>
      <p className="text">vokceramic@mail.ru</p>
    </div>
  );
}

export default Footer;
