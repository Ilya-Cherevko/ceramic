import React from "react";
import "./card__wrapper.css";
import "./Card.css";
//import Cards from "./Cards";//
import Cards from "./Constants/DirlisterListCatalog";

export default function Keramogranit() {
  const keramogranit = Cards.filter((card) => card.Category === "Керамогранит");
  console.log(keramogranit);
  return (
    <ul className="card__wrapper">
      {keramogranit.map((card) => (
        <li key={card.id}>
          <div className="card__body">
            <img
              className="card__img"
              src={card.interiors}
              alt={`${card.Сollection + card.Name}`}
            />
            <p className="card__kollection">{card.Сollection}</p>
            <p className="card__name">{card.Name}</p>
            <p className="card__kantry">{card.Сountry}</p>
            <p className="card__size">{card.Size}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
