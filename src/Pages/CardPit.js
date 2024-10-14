import React from "react";
import "../Components/card__wrapper.css";
import "../Components/Card.css";
import Cards from "../Constants/CardsTrap";
import getImageUrl from "../Constants/Utils";
import { useParams, useLocation, Link } from "react-router-dom";

export default function CardPit() {
  let { Collection } = useParams();
  //console.log("Часть пути", Collection);//

  //const location = useLocation();//
  //console.log("Полный путь", location.pathname, location.search);//

  const Item = Cards.filter((card) => card.Collection === Collection);
  console.log(Item);

  //const tovars = Item.filter((it) => it.tovars === "tovars");//
  //console.log("Товары из базы", tovars);//

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
                <p className="card__collection">Коллекция: {card.Collection}</p>
                <p className="card__name">Производитель: {card.Name}</p>
                <p className="card__country">
                  Страна производства: {card.Сountry}
                </p>
                <p className="card__country">Размеры: {card.Size}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h3>Ассортимент</h3>

      {Item.map((card) => (
        <img
          className="card__img_card"
          src={card.tovars}
          alt={card.tovars.length}
        />
      ))}
    </article>
  );
}
