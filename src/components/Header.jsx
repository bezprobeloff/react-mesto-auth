import React, { useContext, useEffect, useState } from 'react';
import logo from '../images/logo.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useLocation, useHistory } from 'react-router-dom';

const Header = ({ onSignOut }) => {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const history = useHistory();
  const [link, setLink] = useState({ text: '', path: '' });
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

  const onLinkClick = () => {
    currentUser.isLoggedIn ? onSignOut() : history.push(link.path);
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
    switch (location.pathname) {
      case '/sign-in':
        setLink({ ...link, text: 'Регистрация', path: './sign-up' });
        break;
      case '/sign-up':
        setLink({ ...link, text: 'Войти', path: './sign-in' });
        break;
      case '/':
        setLink({ ...link, text: 'Выйти', path: './sign-in' });
        break;
    }
  }, [location.pathname, currentUser.isLoggedIn]);

  return (
    <header className='header'>
      <a href='./' className='header__link'>
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
          onClick={onLinkClick}
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
