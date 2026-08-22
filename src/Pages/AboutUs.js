import React from "react";
import Fasad from "../images/Fasad.jpg";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-us">
      <h1 className="about-us__title">О нас</h1>
      <div className="adres">
        <img 
          src={Fasad} 
          className="fasadStrit" 
          alt="Фасад магазина VOK Ceramic" 
          loading="lazy"
        />
        <iframe
          title="Карта проезда к VOK Ceramic"
          src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae4d4561ebe74897d0e337ce8e244ec21f89df4b5fcf68a6b607d37c3f5dcb72c&amp;source=constructor"
          frameBorder="0"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default AboutUs;