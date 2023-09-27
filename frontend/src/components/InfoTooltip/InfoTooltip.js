import Popup from "../Popup/Popup";
import "./InfoTooltip.css";

export default function InfoTooltip(props) {
  return (
    <Popup name={props.name} isOpen={props.isOpen} onClose={props.onClose}>
      <div
        className={`tooltip__sign ${
          { 
            success: "tooltip__sign_success",
            fail: "tooltip__sign_fail"
          }[props.type]
        }`}>
      </div>
      <p className="tooltip__message">
        {
          {
            success: "Вы успешно зарегистрировались!",
            fail: "Что-то пошло не так! Попробуйте ещё раз.",
          }[props.type]
        }
      </p>
    </Popup>
  );
}
