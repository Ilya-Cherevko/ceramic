import React from "react";
import "../Components/card__wrapper.css";
import "../Components/Card.css";
import Cards from "../Constants/CardsTrap";
import getImageUrl from "../Constants/Utils";
import { useParams, useLocation, Link } from "react-router-dom";

export default function CardPit() {
  let { Collection } = useParams();
  console.log("Часть пути", Collection);

  const location = useLocation();
  console.log(location.pathname, location.search);

  const Item = Cards.filter((card) => card.Collection === Collection);
  console.log(Item);

  const tovars = Cards.filter((card) => card.tovars === "tovars");
  console.log(tovars);

  return (
    <article>
      <ul className="card__wrapper">
        {Item.map((card) => (
          <li key={card.id}>
            <div className="card__body_one">
              <img
                className="card__img_card"
                src={getImageUrl(card)}
                alt={card.Name + card.interiors}
              />
              <div className="card__conteiner">
                <p className="card__collection">{card.Collection}</p>
                <p className="card__name">{card.Name}</p>
                <p className="card__country">{card.Сountry}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h3>Раздел</h3>
    </article>
  );
}
