import { Link } from 'react-router-dom';
import logo from '../images/logo-mesto.svg';

export default function Header({ type, userEmail="example@mail.net", onSignOut }) {

    return(
        <header className="header">
          <img
            src={logo}
            alt="логотип Место"
            className="header__logo"
          />
          <nav className="header__menu" >
            {{
              signin: <Link to="/sign-up" className='header__link'>Регистрация</Link>,
              signup: <Link to="/sign-in" className='header__link'>Войти</Link>,
              index: 
              <>
                <p className='header__email'>{userEmail}</p>
                <Link to="/sign-in" className='header__link header__link_pale' onClick={onSignOut}>Выйти</Link>
              </>
            }[type]}
          </nav>
        </header>
    )
}