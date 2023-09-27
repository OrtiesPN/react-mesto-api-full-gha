import { useState, useEffect, useCallback } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { auth } from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import ContentSection from "./ContentSection";

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isWarningPopupOpen, setWarningPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState({});
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [cardToDelete, setCardToDelete] = useState("");

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("")

  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // открытие попапов, установка слушателя на esc
  function setEscapeButtonListener() {
    document.addEventListener("keydown", closePopupByEscape);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEscapeButtonListener();
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEscapeButtonListener();
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEscapeButtonListener();
  }

  function handleCardClick(data) {
    setSelectedCard(data);
    setImagePopupOpen(true);
    setEscapeButtonListener();
  }
  // обработчики карточек
  function handleTrashClick(cardId) {
    setCardToDelete(cardId);
    setWarningPopupOpen(true);
    setEscapeButtonListener();
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    api
      .deleteCard(cardToDelete)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card.id !== cardToDelete;
          })
        );
        closeAllPopups();
      })
      .catch((error) => console.error(`Fail to delete place: ${error}`));
  }
  // сброс стейтов для попапов и функции их закрытия, сброс слушателя на esc
  const resetAllStates = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setWarningPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsInfoTooltipOpen(false);
  }, []);

  const closePopupByEscape = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        resetAllStates();
        document.removeEventListener("keydown", closePopupByEscape);
      }
    },
    [resetAllStates]
  );

  const closeAllPopups = useCallback(() => {
    resetAllStates();
    document.removeEventListener("keydown", closePopupByEscape);
  }, [resetAllStates, closePopupByEscape]);

  // обработчики попапов
  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.error(`Fail to update user info: ${error}`));
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.error(`Fail to update avatar: ${error}`));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((res) => {
        const newCard = {
          id: res._id,
          ownerId: res.owner._id,
          name: res.name,
          link: res.link,
          likes: res.likes,
        };
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error(`Fail to add new place: ${error}`));
  }

  // Логика регистрации и логина

  function handleRegister(password, email) {
    auth
      .setRegistration(password, email)
      .then((res) => {
        setIsInfoTooltipOpen(true);
        setTooltipStatus("success");
        window.scrollTo(0, 0);
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setTooltipStatus("fail");
        console.error(`Registration failed: ${err}`);
      });
  }

  function handleLogin(password, email) {
    auth
      .setAuthorization(password, email)
      .then((res) => {
        setCurrentUser(res);
        setLoggedIn(true);
        window.scrollTo(0, 0);
        navigate("/");
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setTooltipStatus("fail");
        console.error(`Login failed: ${err}`);
      });
  }

  function handleExit() {
    auth.signOut()
      .then(() => {
        setLoggedIn(false);
        navigate('/sign-in');
      })
      .catch(err => {
        console.error(`Signout failed: ${err}`);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      auth.getUserInfo().then((res) => {
        setUserEmail(res.email);
        setLoggedIn(true);
        navigate('/')
      })
      .catch(err => {
        console.error(`Login failed: ${err}`);      
      })
    } 
  }, [navigate, loggedIn]);

  // загрузка изначального массива карточек и установка пользователя
  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          const cardList = cardsData.reverse().map((data) => ({
            id: data._id,
            ownerId: data.owner._id,
            name: data.name,
            link: data.link,
            likes: data.likes,
          }));
          setCards(cardList);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch((error) => console.error(`Fail to load initial cards: ${error}`));
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page__container">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={ContentSection}
                  loggedIn={loggedIn}
                  onSignOut={handleExit}
                  userEmail={userEmail}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onTrashClick={handleTrashClick}
                  cards={cards}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <>
                  <Header type="signin" />
                  <Main type="signin" onSignIn={handleLogin} />
                </>
              }
            />
            <Route
              path="/sign-up"
              element={
                <>
                  <Header type="signup" />
                  <Main type="signup" onSignUp={handleRegister} />
                </>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            name="warning"
            title="Вы уверены ?"
            titleButton="Да"
            isOpen={isWarningPopupOpen}
            onSubmit={handleCardDelete}
            onClose={closeAllPopups}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            name="tooltip"
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            type={tooltipStatus}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
