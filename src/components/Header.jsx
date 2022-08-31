import React, { useContext, useEffect, useState } from 'react';
import logo from '../images/logo.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Header = ({ onSignOut }) => {
  const currentUser = useContext(CurrentUserContext);
  const [link, setLink] = useState({ text: '', link: '' });
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const classAuthBurgerDisable = !isBurgerOpen ? ' header__auth_disabled' : '';

  const classAuthBurger = currentUser.isLoggedIn
    ? ' header__auth_type_burger'
    : '';
  const classAuthEmailBurger = !currentUser.isLoggedIn
    ? ' header__auth-email_disabled'
    : '';

  const classAuthLinkSignOut = currentUser.isLoggedIn
    ? ' header__auth-link_type_sign-out'
    : '';

  const classAuthButtonBurgerRemove = !currentUser.isLoggedIn
    ? ' header__button-burger_disabled'
    : '';

  const handleSignOut = () => {
    onSignOut();
  };

  const onButtonBurgerClick = (evt) => {
    setIsBurgerOpen(!isBurgerOpen);
    if (isBurgerOpen) {
      evt.target.classList.add('header__button-burger_type_close');
    } else {
      evt.target.classList.remove('header__button-burger_type_close');
    }
  };

  useEffect(() => {
    setIsBurgerOpen(false);
  }, []);

  useEffect(() => {
    switch (window.location.pathname) {
      case '/sign-in':
        setLink({ ...link, text: 'Регистрация', link: './sign-up' });
        break;
      case '/sign-up':
        setLink({ ...link, text: 'Войти', link: './sign-in' });
        break;
      case '/':
        setLink({ ...link, text: 'Выйти', link: './sign-in' });
        break;
    }
  }, [window.location.pathname, currentUser.isLoggedIn]);

  return (
    <header className='header'>
      <a href='./index.html' className='header__link'>
        <img src={logo} className='header__logo' alt='Лого Mesto' />
      </a>
      <div
        className={`header__auth${classAuthBurger}${classAuthBurgerDisable}`}
      >
        <p className={`header__auth-email${classAuthEmailBurger}`}>
          {currentUser?.email}
        </p>
        <a
          className={`header__auth-link${classAuthLinkSignOut}`}
          onClick={handleSignOut}
        >
          {link.text}
        </a>
      </div>
      <button
        onClick={onButtonBurgerClick}
        className={`header__button-burger${classAuthButtonBurgerRemove}`}
      ></button>
    </header>
  );
};

export default Header;
