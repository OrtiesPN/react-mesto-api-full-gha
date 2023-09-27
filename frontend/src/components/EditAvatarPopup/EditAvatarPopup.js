import PopupWithForm from "../PopupWithForm";
import useValidator from "../../utils/useValidator";
import { useEffect, useRef } from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const link = useRef()
  const { values, errors, isInputValid, isFormValid, handleChange, reset } =
    useValidator();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({user_avatar: link.current.value}, reset);
  }

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset])


  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      titleButton="Сохранить"
      isOpen={isOpen}
      isValid={isFormValid}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <fieldset className="popup__inputs">
        <label>
          <input
            className={`popup__input ${isInputValid.user_avatar === undefined || isInputValid.user_avatar ? "" :  "popup__input_error" }`}
            id="avatar"
            name="user_avatar"
            type="url"
            placeholder="Ссылка на картинку"
            required
            ref={link}
            value={values.user_avatar? values.user_avatar : ''}
            onChange={handleChange}
          />
          <span className={`popup__error ${!isInputValid.user_avatar && "popup__error_visible"}`} id="avatar-error">{errors.user_avatar}</span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
