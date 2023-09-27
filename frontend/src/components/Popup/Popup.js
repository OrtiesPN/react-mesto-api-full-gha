export default function Popup(props) {
    return (
      <div
        className={`popup ${props.name}-popup ${props.isOpen && "popup_opened"}`}
        onClick={props.onClose}
      >
        <div className={`${props.name === "image-card" ? "popup__container_image" : props.name === "tooltip" ? "tooltip__container" : "popup__container" } `} onClick={(evt=> evt.stopPropagation())}>
          <button
            className="button popup__close-btn"
            type="button"
            aria-label="Закрыть"
            onClick={props.onClose}
          />
          {props.children}
        </div>
      </div>
    );
  }
  