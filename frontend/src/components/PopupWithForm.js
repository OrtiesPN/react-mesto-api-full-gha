import Popup from "./Popup/Popup";
import Form from "./Form/Form";

export default function PopupWithForm(props) {
  return (
    <Popup name={props.name} isOpen={props.isOpen} onClose={props.onClose}>
      <Form type={"popup"} name={props.name} title={props.title} titleButton={props.titleButton} isValid={props.isValid} onSubmit={props.onSubmit}>
        {props.children}
      </Form>
    </Popup>
  );
}

// PopupWithForm.defaultProps = {isValid : true};

// export default function PopupWithForm(props) {
//   return (
//     <div
//       className={`popup ${props.name}-popup ${props.isOpen && "popup_opened"}`}
//       onClick={props.onClose}
//     >
//       <div className="popup__container" onClick={(evt=> evt.stopPropagation())}>
//         <button
//           className="button popup__close-btn"
//           type="button"
//           aria-label="Закрыть"
//           onClick={props.onClose}
//         />
//         <form className="popup__form" id={`${props.name}-form`} onSubmit={props.onSubmit}>
//           <h3 className={`popup__title popup__title_${props.name}`}>
//             {props.title}
//           </h3>
//           {props.children}
//           <button
//             className={`button popup__submit-btn ${!props.isValid && "popup__submit-btn_disabled" }`}
//             type="submit"
//             aria-labelledby="Сохранить"
//           >
//             {props.titleButton}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
