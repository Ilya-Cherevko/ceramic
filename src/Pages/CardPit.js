import React from "react";
import "../Components/card__wrapper.css";
import "../Components/Card.css";
import Cards from "../Constants/DirlisterListCatalog";
//import getImageUrl from "../Constants/Utils";//
import { useParams } from "react-router-dom";
import { useState } from "react";
import ImagePopup from "../Components/ImagePopup";

//console.log(Cards);//

export default function CardPit() {
  // Состояние попапа
  const [selectedCard, setSelectedCard] = useState({ isOpen: false });

  let { Collection } = useParams();
  //console.log("Часть пути начальная", Collection);//

  //const location = useLocation();//
  //console.log(location.pathname, location.search);//

  const Item = Cards.filter((card) => card.Collection === Collection);
  //console.log(Item);//

  function closeAllPopups() {
    setSelectedCard({ isOpen: false });
  }

  // Большая картинка
  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      ...card,
    });
    console.log("кликнул");
  }

  return (
    <article className="card__page">
      {Item.map((card) => (
        <div key={card.id}>
          <div className="card__body_one">
            <img
              className="card__img_card"
              src={card.interiors[0]}
              alt={card.Name}
              onCardClick={handleCardClick}
            />
            <div className="card__img-interior">
              <div className="card__conteiner">
                <p className="card__collection">Коллекция: {card.Collection}</p>
                <p className="card__name">Производитель: {card.Name}</p>
                <p className="card__country">
                  Страна производства: {card.Сountry}
                </p>
                <p className="card__country">Размеры: {card.Size}</p>
              </div>

              <ul className="card__img-interiors">
                {card.interiors.map((card) => (
                  <li className="card__img_tovars">
                    <img
                      className="card__img_interiors"
                      src={card}
                      alt={card}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="card__wrapper-tovars">
            {card.tovars.map((card) => (
              <li className="card__body">
                <img className="card__img_tovar" src={card} alt={card} />
                <p className="card__collection">{card.Collection}</p>
                <p className="card__name">{card.Name}</p>
                <p className="card__country">{card.Size}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {/* Превью большой картинки */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </article>
  );
}
