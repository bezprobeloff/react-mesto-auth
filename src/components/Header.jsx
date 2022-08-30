import React from 'react';
import logo from '../images/logo.svg';

const Header = () => {
  const pathName = window.location.pathname;
  const link = { text: '', linkTo: '', isExit: false };
  switch (pathName) {
    case '/':
      link.text = 'email';
      link.linkTo = '';
      link.isExit = true;
  }

  console.log(pathName);
  return (
    <header className='header'>
      <a href='./index.html' className='header__link'>
        <img src={logo} className='header__logo' alt='Лого Mesto' />
      </a>
      <div className='header__auth header__auth_type_burger'>
        <p className='header__auth-email'>{link.text}</p>
        <a className='header__auth-link'>Выйти</a>
      </div>
      <button style={{ display: 'none' }}>XX</button>
    </header>
  );
};

export default Header;
