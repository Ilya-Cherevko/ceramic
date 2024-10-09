import React from "react";
import "./Components/card.css";
//import getImageUrl from "./Constants/Utils";//

export default function Card(card) {
  return (
    <div className="card__body">
      <img
        className="card__img"
        src={card.interiors}
        alt={card.Name + card.interiors}
      />
      <p className="card__collection">{card.Collection}</p>
      <p className="card__name">{card.Name}</p>
      <p className="card__country">{card.Сountry}</p>
    </div>
  );
}
