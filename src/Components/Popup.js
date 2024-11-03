import { useEffect, useRef } from "react";

function Popup(props) {
  const { children, onClose, isOpen } = props;
  const popup = useRef();

  useEffect(() => {
    function handleEscKey(e) {
      const isKeyEsc = e.key === "Escape";
      isKeyEsc && onClose();
    }

    function handleClickOverlay(e) {
      const isOverlay = e.target === e.currentTarget;
      isOverlay && onClose();
    }

    document.addEventListener("keydown", handleEscKey);
    popup.current.addEventListener("mousedown", handleClickOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      popup.current.removeEventListener("mousedown", handleClickOverlay);
    };
  });

  return (
    <section className={`popup ${isOpen && "popup_opened"}`} ref={popup}>
      {children}
    </section>
  );
}

export default Popup;
