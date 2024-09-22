import React from 'react'

export default function Azori(initialCards) {
  return (
    <div>
      <h1>Плитка, {initialCards.name}</h1>
      <image src={initialCards.link}>
        
      </image>
    </div>
  )
}

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    }
  ];