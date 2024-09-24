import React from 'react';
import './card__wrapper.css'
import './Card.css'

export default function Keramogranit () {
  
  return (
    <div className="card__wrapper">
        {Cards.map((card, id) => (
          <div className="card__body">
              <img className="card__img" src={card.interiors} alt={`${card.Kollection + id + card.Name}`} />
              <p className="card__kollection">{card.Kollection}</p>
              <p className="card__name">{card.Name}</p>
              <p className="card__kantry">{card.Kantry}</p>
              <p className="card__size">{card.Size}</p>
          </div>
        ))}
      </div>
    )
}

export const Cards = [
    {
    id: '1',
    Kantry: 'india',
    Name: 'absolut_gres',
    Kollection: 'agate',
    Size: '60x120',
    interiors: require('../src/images/catalog/azori/acate/interiors/azori_acate_17906_167402_0x300.jpg'),
    },
    {
        id: '2',
    Kantry: 'india',
    Name: 'absolut_gres',
    Kollection: 'agate',
    Size: '60x120',
    interiors: require('../src/images/catalog/azori/acate/interiors/azori_acate_17906_300786_0x300.jpg'),
    },
    {
        id: '3',
    Kantry: 'india',
    Name: 'absolut_gres',
    Kollection: 'agate',
    Size: '60x120',
    interiors: require('../src/images/catalog/azori/acate/interiors/azori_acate_17906_309981_0x300.jpg'),
    }
]