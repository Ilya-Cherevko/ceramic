import React from "react";
import { Link } from "react-router-dom";
import "../Components/card__wrapper.css";
import "../Components/Card.css";
import Cards from "../Constants/CardsTrap";
import getImageUrl from "../Constants/Utils";
import { useParams } from "react-router-dom";

export default function TovarsBig() {
  let { Collection } = useParams();
  console.log(Collection);
  const Item = Cards.filter((card) => card.Category === Collection);
  /*console.log(Item);*/
  return (
    <ul className="card__wrapper">
      {Item.map((card) => (
        <li key={card.id}>
          <div className="card__body">
            <Link to={card.Name}>
              <img
                className="card__img"
                src={getImageUrl(card)}
                alt={card.Name + card.interiors}
              />
            </Link>
            <Link to={card.Сollection} className="card__collection">
              {card.Сollection}
            </Link>
            <Link to={card.Name} className="card__name">
              {card.Name}
            </Link>
            <p className="card__country">{card.Сountry}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
