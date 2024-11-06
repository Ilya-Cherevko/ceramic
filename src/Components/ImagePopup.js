import Popup from "./Popup";

function ImagePopup(props) {
  const { card, onClose } = props;
  console.log(card);

  return (
    <Popup onClose={onClose} isOpen={card.isOpen}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button link"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <figure className="popup__content-container">
          <img
            className="popup__image-big"
            src={card && card.interiors}
            alt={card && card.Name}
          />
          <figcaption className="popup__image-caption">{card.Name}</figcaption>
        </figure>
      </div>
    </Popup>
  );
}

export default ImagePopup;
