import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = (props) => {
  const {
    cards,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete,
  } = props;

  const currentUser = useContext(CurrentUserContext);
  const cardElements = cards.map((card) => (
    <Card
      card={card}
      key={card._id}
      onCardClick={onCardClick}
      onCardDelete={onCardDelete}
      onCardLike={onCardLike}
    />
  ));

  return (
    <main className='content'>
      <section className='profile' aria-label='Профиль пользователя'>
        <div className='profile__avatar-container' onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt='Аватар пользователя'
            className='profile__avatar-image'
          />
        </div>
        <div className='profile__info'>
          <div className='profile__container-name'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              className='profile__button-edit'
              type='button'
              onClick={onEditProfile}
              aria-label='Редактировать'
            ></button>
          </div>
          <p className='profile__job'>{currentUser.about}</p>
        </div>
        <button
          className='profile__button-add'
          type='button'
          onClick={onAddPlace}
          aria-label='Добавить'
        ></button>
      </section>
      <section className='cards' aria-label='Фотокарточки'>
        {cardElements}
      </section>
    </main>
  );
};

export default Main;
