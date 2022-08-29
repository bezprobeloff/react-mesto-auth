import React from 'react';
import logo from '../images/logo.svg';

const Header = ({ userData }) => {
  return (
    <header className='header'>
      <a href='./index.html' className='header__link'>
        <img src={logo} className='header__logo' alt='Лого Mesto' />
      </a>
      <p>{userData.email}</p>
    </header>
  );
};

export default Header;
