import Popup from "./Popup/Popup"

export default function ImagePopup(props) {
  return(
    <Popup name={"image-card"} isOpen={props.isOpen} onClose={props.onClose}>
        <figure className="popup-card">
          <img className="popup-card__image" alt={props.card.name} src={props.card.link} />
          <figcaption className="popup-card__caption">{props.card.name}</figcaption>
        </figure>
    </Popup>
  )
}