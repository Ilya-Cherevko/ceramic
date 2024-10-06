import React from "react";
import Fasad from "../images/Fasad.jpg";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="adres">
      <img src={Fasad} className="fasadStrit" alt="Fasad" />
      <iframe
        title="Map"
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae4d4561ebe74897d0e337ce8e244ec21f89df4b5fcf68a6b607d37c3f5dcb72c&amp;source=constructor"
        width="500"
        height="400"
        frameborder="0"
      ></iframe>
    </div>
  );
}

export default AboutUs;
