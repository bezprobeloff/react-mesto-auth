import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((like) => like._id === currentUser._id);

  const cardRemoveButtonClassName = `card__button-remove ${
    isOwn ? '' : 'card__button-remove_hidden'
  }`;
  const cardLikeButtonClassName = `card__button-like ${
    isLiked ? 'card__button-like_activated' : ''
  }`;

  const handleImageClick = () => {
    onCardClick(card);
  };
  const handleLikeClick = () => {
    onCardLike(card);
  };
  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <article className='card'>
      <button
        className={cardRemoveButtonClassName}
        onClick={handleDeleteClick}
        type='button'
        aria-label='Удалить'
      ></button>
      <img
        src={card.link}
        onClick={handleImageClick}
        className='card__image'
        alt='Фото'
      />
      <div className='card__info'>
        <h2 className='card__name'>{card.name}</h2>
        <div className='card__container-like'>
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type='button'
            aria-label='Лайк'
          ></button>
          <p className='card__count-like'>{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
};

export default Card;
