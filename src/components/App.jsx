import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import * as mestoAuth from '../utils/mestoAuth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import { useHistory } from 'react-router-dom';

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({
    name: 'user',
    about: 'about',
    avatar: '',
    isLoggedIn: false,
    userEmail: '',
  });

  useEffect(() => {
    Promise.all([api.getUser(), api.getInitialCards()])
      .then(([user, dataCards]) => {
        setCurrentUser(user);
        setCards(dataCards);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth(token);
    }
  }, [currentUser.isLoggedIn]);

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      history.push('/');
    }
  }, [history, currentUser.isLoggedIn]);

  const onRegister = ({ email, password }) => {
    return mestoAuth
      .register({ email, password })
      .then((res) => console.log(res));
  };

  const onLogin = ({ email, password }) => {
    return mestoAuth.authorize({ email, password }).then((data) => {
      setCurrentUser({ ...currentUser, isLoggedIn: true });
      localStorage.setItem('token', data.token);
    });
  };

  // проверяем наличие токена, если все хорошо сразу логинимся
  const auth = async (token) => {
    mestoAuth.getContent(token).then((res) => {
      if (res) {
        setCurrentUser({
          ...currentUser,
          isLoggedIn: true,
          userEmail: res.email,
        });
      }
    });
  };

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
    setIsInfoTooltipOpen(false);
    removeHandleEscClosePopup();
  };

  return (
    <div className='page__content'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Switch>
          <ProtectedRoute
            exact
            path='/'
            component={Main}
            isLoggedIn={currentUser.isLoggedIn}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
          ></ProtectedRoute>
          <Route path='/sign-up'>
            <Register onRegister={onRegister} />
          </Route>
          <Route path='/sign-in'>
            <Login onLogin={onLogin} />
          </Route>
        </Switch>
        <Footer />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} />
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
