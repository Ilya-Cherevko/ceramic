import React from 'react'
import './card__wrapper.css'
import './Card.css'
import Cards from './Cards'

export default function plitka () {
  const plitka = Cards.filter(card =>
    card.Tip === 'plitka'
  );
  return (
  <ul className="card__wrapper">
  {plitka.map(card =>
    <li key={card.id}>
        <div className="card__body">
              <img className="card__img" src={card.interiors[0]} alt={`${card.Kollection + card.Name}`} />
              <p className="card__kollection">{card.Kollection}</p>
              <p className="card__name">{card.Name}</p>
              <p className="card__kantry">{card.Kantry}</p>
              <p className="card__size">{card.Size}</p>
        </div>
    </li>
     
  )}
  </ul>
  )  
}