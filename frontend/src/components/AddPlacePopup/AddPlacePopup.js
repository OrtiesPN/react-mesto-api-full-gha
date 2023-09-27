import { useEffect } from "react";
import PopupWithForm from "../PopupWithForm";
import useValidator from "../../utils/useValidator";

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const { values, errors, isInputValid, isFormValid, handleChange, reset} = useValidator();

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
        card_place: values.card_place,
        card_link: values.card_link,
      });
  }

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset])

  return(
    <PopupWithForm
            name="add-card"
            title="Новое место"
            titleButton="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={isFormValid}
          >
            <fieldset className="popup__inputs">
              <label>
                <input
                  className={`popup__input ${isInputValid.card_place === undefined || isInputValid.card_place ? "" :  "popup__input_error" }`}
                  id="place"
                  name="card_place"
                  type="text"
                  minLength={2}
                  maxLength={30}
                  placeholder="Название"
                  required
                  value={values.card_place? values.card_place : ''}
                onChange={handleChange}
                />
                <span className={`popup__error ${!isInputValid.card_place && "popup__error_visible"}`} id="place-error">{errors.card_place}</span>
              </label>
              <label>
                <input
                  className={`popup__input ${isInputValid.card_link === undefined || isInputValid.card_link ? "" :  "popup__input_error" }`}
                  id="link"
                  name="card_link"
                  type="url"
                  placeholder="Ссылка на картинку"
                  required
                  value={values.card_link? values.card_link : ''}
                onChange={handleChange}
                />
                <span className={`popup__error ${!isInputValid.card_link && "popup__error_visible"}`} id="link-error">{errors.card_link}</span>
              </label>
            </fieldset>
          </PopupWithForm>
  )
}