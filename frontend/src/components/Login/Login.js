import useValidator from "../../utils/useValidator";
import Form from "../Form/Form";

export default function Login({onSignIn}) {
  const { values, errors, isInputValid, isFormValid, handleChange} =
    useValidator();

    function handleSubmit(evt) {
      evt.preventDefault();
      onSignIn({
          password: values.login_password,
          email: values.login_email
        });
    }

  return (
    <Form
      type={"static"}
      name={"login"}
      title={"Вход"}
      titleButton={"Войти"}
      isValid={isFormValid}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__inputs">
        <label>
          <input
            className={`form__input ${
              isInputValid.login_email === undefined || isInputValid.login_email
                ? ""
                : "form__input_error"
            }`}
            // id="email"
            name="login_email"
            type="email"
            placeholder="Email"
            required
            value={values.login_email ? values.login_email : ""}
            onChange={handleChange}
          />
          <span
            className={`form__error ${
              !isInputValid.login_email && "form__error_visible"
            }`}
            id="email-error"
          >
            {errors.login_email}
          </span>
        </label>
        <label>
          <input
            className={`form__input ${
              isInputValid.login_password === undefined || isInputValid.login_password
                ? ""
                : "form__input_error"
            }`}
            // id="password"
            name="login_password"
            type="password"
            placeholder="Пароль"
            required
            value={values.login_password ? values.login_password : ""}
            onChange={handleChange}
          />
          <span
            className={`form__error ${
              !isInputValid.login_password && "form__error_visible"
            }`}
            id="password-error"
          >
            {errors.login_password}
          </span>
        </label>
      </fieldset>
    </Form>
  );
}
