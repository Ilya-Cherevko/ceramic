import React from 'react';

export default function Keramogranit () {
  
  return (
    <div className="card">
        {Cards.map((card, id) => (
          
          <div className="card__body">
              <img className="card__img" src={card.interiors} alt={`Slide ${id + card.interiors}`} />
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
    interiors: '../src/images/catalog/absolut_gres/agate/interiors/absolut_gres_agate_12679_825776_0x500.jpg',
    },
    {
        id: '2',
    Kantry: 'india',
    Name: 'absolut_gres',
    Kollection: 'agate',
    Size: '60x120',
    tovars: '../src/images/catalog/absolut_gres/agate/tovars/absolut_gres_agate_103750_668232_300x0.jpg',
    },
    {
        id: '3',
    Kantry: 'india',
    Name: 'absolut_gres',
    Kollection: 'agate',
    Size: '60x120',
    tovars: '../src/images/catalog/absolut_gres/agate/tovars/absolut_gres_agate_106802_774882_300x0.jpg',
    }
]