import React from "react";
import "../Components/card__wrapper.css";
import "../Components/Card.css";
import Cards from "../Constants/CardsTrap";
import getImageUrl from "../Constants/Utils";
import { useParams, useLocation, Link } from "react-router-dom";

export default function CardPit() {
  let { Collection } = useParams();

  const Item = Cards.filter((card) => card.Collection === Collection);
  console.log(Item);

  return (
    <article className="card__page">
      <ul className="card__page">
        {Item.map((card) => (
          <li key={card.id}>
            <div className="card__body_one">
              <img
                className="card__img_card"
                src={getImageUrl(card)}
                alt={card.Name + card.interiors}
              />
              <div className="card__conteiner">
                <p className="card__collection">Коллекция: {card.Collection}</p>
                <p className="card__name">Производитель: {card.Name}</p>
                <p className="card__country">
                  Страна производства: {card.Сountry}
                </p>
                <p className="card__country">Размеры: {card.Size}</p>
              </div>
            </div>
            <ul className="card__wrapper">
            {card.tovars.map((card) => (
              <li className="card__conteiner">
              
              
                <img className="card__img_tovar" src={card} alt={card} />
                <p className="card__collection">{card.Collection}</p>
                <p className="card__name">{card.Name}</p>
                <p className="card__country">Размеры: {card.Size}</p>
              
              </li>
            ))}
            </ul>
          </li>
        ))}
      </ul>
      <h3>Ассортимент</h3>
    </article>
  );
}
