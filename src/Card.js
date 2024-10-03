import React from "react";
import "./Card.css";

export default function Card(card) {
  return (
    <div className="card__body">
      <img className="card__img" src={card.interiors} alt={card.Name} />
      <p className="card__kollection">{card.Сollection}</p>
      <p className="card__name">{card.Name}</p>
      <p className="card__kantry">{card.Сountry}</p>
    </div>
  );
}
