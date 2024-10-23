import React from "react";
import { Link } from "react-router-dom";
import "../Components/card__wrapper.css";
import "../Components/Card.css";
import Cards from "../Constants/DirlisterListCatalog";
//import getImageUrl from "../Constants/Utils";//
import { useParams } from "react-router-dom";

export default function CardBuild() {
  let { Name } = useParams();
  //console.log('Часть пути', Name);//

  //const location = useLocation();//
  //console.log(location.pathname, location.search);//

  const Item = Cards.filter((card) => card.Name === Name);
  console.log(Item);

  return (
    <ul className="card__wrapper">
      {Item.map((card) => (
        <li key={card.id}>
          <div className="card__body">
            <Link to={card.Collection}>
              <img
                className="card__img"
                src={card.interiors[0]}
                alt={card.Name + card.interiors}
              />
            </Link>
            <Link to={card.Collection} className="card__collection">
              {card.Collection}
            </Link>
            <p className="card__name">{card.Name}</p>
            <p className="card__country">{card.Сountry}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
