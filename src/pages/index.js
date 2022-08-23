import {
  formSelectors,
  apiConfig,
  userNameSelector,
  userJobSelector,
  userAvatarSelector,
  userAvatarContainer,
  userNameInput,
  userJobInput,
  profileEditButton,
  profileAddButton,
  cardListSection,
  cardTemplateSelector,
  popupViewImageSelector,
  popupEditProfileSelector,
  popupAddCardSelector,
  popupConfirmSelector,
  popupUpdateAvatarSelector,
} from '../utils/constants.js';

import Api from '../components/Api';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';

const api = new Api(apiConfig);

const formValidators = {};
const enableValidationForms = () => {
  const forms = Array.from(document.forms);
  forms.forEach((form) => {
    const formValidator = new FormValidator(formSelectors, form);
    const formName = form.getAttribute('name');
    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  });
};
// включаем валидацию форм
enableValidationForms();

const userInfo = new UserInfo({
  nameSelector: userNameSelector,
  jobSelector: userJobSelector,
  avatarSelector: userAvatarSelector,
});

const popupUpdateAvatar = new PopupWithForm(
  {
    initializeForm: () => {
      formValidators['formUpdateAvatar'].resetValidation();
    },
    handleSubmit: (evt) => {
      evt.preventDefault();

      const avatarLink = popupUpdateAvatar.getInputValues().avatar;
      api
        .updateAvatar(avatarLink)
        .then((res) => {
          popupUpdateAvatar.setTextButton('Сохранение...');

          userInfo.updateAvatar(res.avatar);
          popupUpdateAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupUpdateAvatar.resetTextButton();
        });
    },
  },
  popupUpdateAvatarSelector
);

popupUpdateAvatar.setEventListeners();
userAvatarContainer.addEventListener(
  'click',
  popupUpdateAvatar.open.bind(popupUpdateAvatar)
);

const popupConfirm = new PopupConfirm(
  {
    handleConfirm: (card) => {
      api
        .removeCard(card.getId())
        .then(() => {
          card.remove();
          popupConfirm.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  popupConfirmSelector
);

popupConfirm.setEventListeners();

const popupWithImage = new PopupWithImage(popupViewImageSelector);
popupWithImage.setEventListeners();

const createCard = ({ name, link, likes, _id, owner }) => {
  const card = new Card(
    {
      name,
      link,
      likes,
      _id,
      owner,
      userId: userInfo.getUserId(),
      handleButtonLike: () => {
        const stateLike = card
          .getLikes()
          .find((owner) => owner._id === userInfo._id);

        if (!stateLike) {
          api
            .setLike(card.getId())
            .then((res) => {
              card.renderLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .removeLike(card.getId())
            .then((res) => {
              card.renderLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
      handleCardClick: () => {
        popupWithImage.open({ name, link });
      },
      handleRemoveCardClick: () => {
        popupConfirm.open(card);
      },
    },
    cardTemplateSelector
  );
  const cardElement = card.generateCard();

  return cardElement;
};

//создаем класс разметки карточки с пустым массивом
const cardList = new Section(
  {
    items: null,
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem);
      cardList.addItem(cardElement);
    },
  },
  cardListSection
);

// получим сразу данные по юзеру и карточкам
Promise.all([api.getUser(), api.getInitialCards()])
  .then(([userData, cards]) => {
    // проинициализируем данные юзера на странице
    userInfo.initialize(userData);
    const dataCards = cards.map((data) => {
      return {
        name: data.name,
        link: data.link,
        likes: data.likes,
        _id: data._id,
        owner: data.owner,
      };
    });
    // передадим массив данных
    cardList.setInitialArray(dataCards);
    // и сделаем рендер карточек
    cardList.renderedItems();
  })
  .catch((err) => {
    console.log(err);
  });

const popupEditProfile = new PopupWithForm(
  {
    initializeForm: () => {
      const userData = userInfo.getUserInfo();
      userNameInput.value = userData.name;
      userJobInput.value = userData.job;
      formValidators['formEditProfile'].resetValidation();
    },
    handleSubmit: (evt) => {
      evt.preventDefault();
      popupEditProfile.setTextButton('Сохранение...');
      const inputValues = popupEditProfile.getInputValues();
      api
        .setUser({ name: inputValues.name, about: inputValues.job })
        .then(() => {
          userInfo.setUserInfo(inputValues);
          popupEditProfile.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupEditProfile.resetTextButton();
        });
    },
  },
  popupEditProfileSelector
);

popupEditProfile.setEventListeners();
profileEditButton.addEventListener(
  'click',
  popupEditProfile.open.bind(popupEditProfile)
);

const popupAddCard = new PopupWithForm(
  {
    initializeForm: () => {
      formValidators['formAddCard'].resetValidation();
    },
    handleSubmit: (evt) => {
      evt.preventDefault();
      popupAddCard.setTextButton('Сохранение...');
      const inputValues = popupAddCard.getInputValues();
      const cardItem = {
        name: inputValues['card-name'],
        link: inputValues['card-link'],
      };

      api
        .createCard(cardItem)
        .then((res) => {
          cardItem._id = res._id;
          cardItem.owner = res.owner;
          cardItem.likes = res.likes;
          const cardElement = createCard(cardItem);
          cardList.addItem(cardElement);
          popupAddCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupAddCard.resetTextButton();
        });
    },
  },
  popupAddCardSelector
);
popupAddCard.setEventListeners();
profileAddButton.addEventListener(
  'click',
  popupAddCard.open.bind(popupAddCard)
);
