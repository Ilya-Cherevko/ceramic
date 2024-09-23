import React from 'react';
import './Card.css'

export default function Card (card, id) {
  
  return (
              <div className="card__body">
                <img className="card__img" src={card.interiors} alt={`Slide ${id + card.interiors}`} />
                <h3 className="card__kollection">{card.Kollection}</h3>
                <p className="card__name">{card.Name}</p>
                <p className="card__kantry">{card.Kantry}</p>
                <p className="card__size">{card.Size}</p>
          </div>
       
    )
}