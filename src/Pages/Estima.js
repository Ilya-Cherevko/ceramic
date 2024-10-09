import React from "react";
import "../Components/card__wrapper.css";
import "../Components/Card.css";
import Cards from "../Constants/CardsTrap";
import getImageUrl from "../Constants/Utils";

export default function Estima() {
  const Item = Cards.filter((card) => card.Name === "Estima");
  console.log(Item);
  return (
    <ul className="card__wrapper">
      {Item.map((card) => (
        <li key={card.id}>
          <div className="card__body">
            <img
              className="card__img"
              src={getImageUrl(card)}
              alt={card.Name + card.interiors}
            />
            <p className="card__collection">{card.Сollection}</p>
            <p className="card__name">{card.Name}</p>
            <p className="card__country">{card.Сountry}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}