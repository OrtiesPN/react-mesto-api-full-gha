import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm";
import useValidator from "../../utils/useValidator";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const {
    values,
    errors,
    isInputValid,
    isFormValid,
    handleChange,
    reset
  } = useValidator();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(
      {
        user_name: values.user_name,
        user_info: values.user_info,
      });
  }

  useEffect(() => {
    if (isOpen) {
      reset({ user_name: currentUser.name, user_info: currentUser.about });
    }
  }, [isOpen, reset, currentUser])

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      titleButton="Сохранить"
      isOpen={isOpen}
      isValid={isFormValid}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <fieldset className="popup__inputs">
        <label>
          <input
            className={`popup__input ${
              isInputValid.user_name === undefined || isInputValid.user_name
                ? ""
                : "popup__input_error"
            }`}
            id="name"
            name="user_name"
            type="text"
            minLength={2}
            maxLength={40}
            placeholder="Имя"
            required
            value={values.user_name ? values.user_name : ""}
            onChange={handleChange}
          />
          <span
            className={`popup__error ${
              !isInputValid.user_name && "popup__error_visible"
            }`}
            id="name-error"
          >
            {errors.user_name}
          </span>
        </label>
        <label>
          <input
            className={`popup__input ${
              isInputValid.user_info === undefined || isInputValid.user_info
                ? ""
                : "popup__input_error"
            }`}
            id="job"
            name="user_info"
            type="text"
            minLength={2}
            maxLength={200}
            placeholder="О себе"
            required
            value={values.user_info ? values.user_info : ""}
            onChange={handleChange}
          />
          <span
            className={`popup__error ${
              !isInputValid.user_info && "popup__error_visible"
            }`}
            id="job-error"
          >
            {errors.user_info}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}