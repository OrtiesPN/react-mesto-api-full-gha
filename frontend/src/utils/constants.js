const RussiaImage = new URL('../images/OctoberWalks-72.jpg', import.meta.url);
const MoscowImage = new URL('../images/autumn_dull-9.jpg', import.meta.url);
const KrajImage = new URL('../images/gele-1.jpg', import.meta.url);
const GeleImage = new URL('../images/gele-187.jpg', import.meta.url);
const LankaImage = new URL('../images/inland-142.jpg', import.meta.url);
const SurfingImage = new URL('../images/cool_surfers-7.jpg', import.meta.url);

const initialCards = [
    {
      card_place: 'Россия',
      card_link: RussiaImage
    },
    {
      card_place: 'Москва',
      card_link: MoscowImage
    },
    {
      card_place: 'Краснодарский край',
      card_link: KrajImage
    },
    {
      card_place: 'Геленджик',
      card_link: GeleImage
    },
    {
      card_place: 'Шри-Ланка',
      card_link: LankaImage
    },
    {
      card_place: 'Серфинг',
      card_link: SurfingImage
    }
  ];

  const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible'
  }

// Селекторы и классы

const profileNameSelector = ('.profile__name');
const profileJobSelector = ('.profile__subtitle');
const avatarSelector = ('.profile__avatar');

const sectionSelector = ('.elements__cards');

const editProfilePopupSelector = ('.edit-profile-popup');
const editAvatarPopupSelector = ('.edit-avatar-popup');
const addCardPopupSelector = ('.add-card-popup');
const imageCardPopupSelector = ('.image-card-popup');
const warningPopupSelector = ('.warning-popup');

const cardTemplate = ('.card-template');

export {
  initialCards,
  validationConfig,
  profileNameSelector,
  profileJobSelector,
  avatarSelector,
  sectionSelector,
  editProfilePopupSelector,
  editAvatarPopupSelector,
  addCardPopupSelector,
  imageCardPopupSelector,
  warningPopupSelector,
  cardTemplate
};