import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "../Components/card__wrapper.css";
import "../Components/Card.css";
import Cards from "../Constants/DirlisterListCatalog";
import getImageUrl from "../Constants/Utils";

export default function CardBuild() {
  let { id } = useParams();
  //console.log("Часть пути начальная", id);//

  const Item = Cards.filter((card) => card.Category === id);
  //console.log(Item);//

  //const location = useLocation();//
  //console.log(location.pathname, location.search);//

  return (
    <ul className="card__wrapper">
      {Item.map((card) => (
        <li key={card.id}>
          <div className="card__body">
            <Link to={card.Name}>
              <img
                className="card__img"
                src={card.interiors[0]}
                alt={card.Name + card.interiors}
              />
            </Link>
            <Link
              to={card.Name + "/" + card.Collection}
              className="card__collection"
            >
              {card.Collection}
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
