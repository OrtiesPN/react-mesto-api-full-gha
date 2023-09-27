import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Login from "./Login/Login";
import Loader from "./Loader/Loader"
import Register from "./Register/Register";

export default function Main({type, onEditProfile, onEditAvatar, onAddPlace, onCardClick, onTrashClick, cards=[], isLoading, onSignUp, onSignIn} ) {
  const currentUser = useContext(CurrentUserContext)
  return (
      <main className="main">
      {{
      index: 
      <>
        <section className="profile">
          <div className="profile__container">
            <button
              className="button profile__avatar-btn"
              type="button"
              onClick={onEditAvatar}
            >
              <img
                src={currentUser.avatar}
                alt="аватар пользователя"
                className="profile__avatar"
              />
            </button>
            <div className="profile__title">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="button profile__edit-btn"
                type="button"
                aria-label="Редактировать профиль"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            className="button profile__add-btn"
            type="button"
            aria-label="Добавить карточку"
            onClick={onAddPlace}
          />
        </section>
        <section className="elements">
          {isLoading? <Loader /> : 
          <ul className="elements__cards">
          {cards.map(({id, ...rest}) => (
            <Card key={id}
             cardId={id}
             {...rest} 
             onCardClick={onCardClick} 
             onTrashClick={onTrashClick}/>
          ))}
          </ul>}
        </section>
    </>,
    signin: <Login onSignIn={onSignIn} />,
    signup: <Register onSignUp={onSignUp} />
    }[type]}
    </main>
  );
}