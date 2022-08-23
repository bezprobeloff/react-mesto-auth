import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: 'user',
    about: 'about',
    avatar: '',
  });

  useEffect(() => {
    Promise.all([api.getUser(), api.getInitialCards()])
      .then(([user, dataCards]) => {
        setCurrentUser(user);
        setCards(dataCards);
      })
      .catch((err) => console.log(err));
  }, []);

  const setHandleEscClosePopup = () => {
    document.addEventListener('keydown', handleEscClosePopup);
  };

  const removeHandleEscClosePopup = () => {
    document.addEventListener('keydown', handleEscClosePopup);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    setHandleEscClosePopup();
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    setHandleEscClosePopup();
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    setHandleEscClosePopup();
  };

  const handleDeleteCardClick = (card) => {
    setIsConfirmPopupOpen(true);
    setSelectedCard(card);
    setHandleEscClosePopup();
  };

  const handleCardClick = (card) => {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
    setHandleEscClosePopup();
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = () => {
    api
      .removeCard(selectedCard?._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((item) => item._id !== selectedCard?._id)
        );
      })
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  };

  const handleAddPlace = ({ name, link }) => {
    api
      .createCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .setUserInfo({ name, about })
      .then(() => {
        setCurrentUser({ ...currentUser, name, about });
      })
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .updateAvatar(avatar)
      .then(() => {
        setCurrentUser({ ...currentUser, avatar });
      })
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  };

  const handleEscClosePopup = (evt) => {
    if (evt.key !== 'Escape') return;

    closeAllPopups();
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    removeHandleEscClosePopup();
  };

  return (
    <div className='page__content'>
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardClick}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlace}
          onClose={closeAllPopups}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onDeleteCard={handleCardDelete}
          onClose={closeAllPopups}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
