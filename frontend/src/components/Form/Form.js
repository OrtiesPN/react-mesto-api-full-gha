import "./Form.css";

export default function Form({
  type,
  name,
  title,
  titleButton,
  isValid = true,
  onSubmit,
  children,
}) {
  return {
    popup: (
      <form className="popup__form" id={`${name}-form`} onSubmit={onSubmit}>
        <h3 className={`popup__title popup__title_${name}`}>{title}</h3>
        {children}
        <button
          className={`button popup__submit-btn ${
            !isValid && "popup__submit-btn_disabled"
          }`}
          type="submit"
          aria-labelledby="Сохранить"
        >
          {titleButton}
        </button>
      </form>
    ),
    static: (
      <form className="form" id={`${name}-form`} onSubmit={onSubmit}>
        <h3 className="form__title">{title}</h3>
        {children}
        <button
          className={`button form__submit-btn ${
            !isValid && "form__submit-btn_disabled"
          }`}
          type="submit"
          aria-labelledby="Войти"
        >
          {titleButton}
        </button>
      </form>
    ),
  }[type];
}
