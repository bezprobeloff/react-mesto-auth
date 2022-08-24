import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <main className='content'>
      <section className='auth'>
        <form action='' className='auth__form'>
          <h1 className='auth__title'>Регистрация</h1>
          <input type='email' className='auth__input' placeholder='Email' />
          <input type='password' className='auth__input' placeholder='Пароль' />
          <button type='submit' className='auth__button-submit'>
            Зарегистрироваться
          </button>
          <Link to='/sign-in' className='auth__link'>
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </section>
    </main>
  );
};

export default Register;
