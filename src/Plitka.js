import React from "react";
import "./card__wrapper.css";
import "./Card.css";
//import Cards from "./Cards";//
//import Cards from "./Cards";//
//import Cards from "./Constants/DirlisterListCatalog";//
import Cards from "./CardsTrap";
//import getImageUrl from "./Constants/Utils";//

export default function Plitka() {
  const Item = Cards.filter((card) => card.Category === "Керамическая плитка");
  console.log(Item);
  return (
    <ul className="card__wrapper">
      {Item.map((card) => (
        <li key={card.id}>
          <div className="card__body">
            <img className="card__img" src={card.interiors} alt={card.Name} />
            <p className="card__kollection">{card.Сollection}</p>
            <p className="card__name">{card.Name}</p>
            <p className="card__kantry">{card.Сountry}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
