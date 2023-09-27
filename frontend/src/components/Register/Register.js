import { Link } from "react-router-dom";
import useValidator from "../../utils/useValidator";
import Form from "../Form/Form";
import "./Register.css";

export default function Register({onSignUp}) {
    const { values, errors, isInputValid, isFormValid, handleChange } =
    useValidator();

    function handleSubmit(evt) {
      evt.preventDefault();
      onSignUp({
          password: values.reg_password,
          email: values.reg_email
        });
    }

  return (
    <>
    <Form
      type={"static"}
      name={"register"}
      title={"Регистрация"}
      titleButton={"Зарегистрироваться"}
      isValid={isFormValid}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__inputs">
        <label>
          <input
            className={`form__input ${
              isInputValid.reg_email === undefined || isInputValid.reg_email
                ? ""
                : "form__input_error"
            }`}
            // id="email"
            name="reg_email"
            type="email"
            placeholder="Email"
            required
            value={values.reg_email ? values.reg_email : ""}
            onChange={handleChange}
          />
          <span
            className={`form__error ${
              !isInputValid.reg_email && "form__error_visible"
            }`}
            id="email-error"
          >
            {errors.reg_email}
          </span>
        </label>
        <label>
          <input
            className={`form__input ${
              isInputValid.reg_password === undefined || isInputValid.reg_password
                ? ""
                : "form__input_error"
            }`}
            // id="password"
            name="reg_password"
            type="password"
            placeholder="Пароль"
            required
            value={values.reg_password ? values.reg_password : ""}
            onChange={handleChange}
          />
          <span
            className={`form__error ${
              !isInputValid.reg_password && "form__error_visible"
            }`}
            id="password-error"
          >
            {errors.reg_password}
          </span>
        </label>
      </fieldset>
    </Form>
    <p className='register__caption'>Уже зарегистрированы? <Link to="/sign-in" className='register__link'>Войти</Link></p>
    </>
  );
}