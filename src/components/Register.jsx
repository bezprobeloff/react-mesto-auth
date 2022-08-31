import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (evt) => {
    switch (evt.target.name) {
      case 'email':
        setEmail(evt.target.value);
        break;
      case 'password':
        setPassword(evt.target.value);
        break;
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!email || !password) {
      return;
    }

    onRegister({ email, password }).then(() => {
      //history.push('./');
    });
  };
  return (
    <main className='content'>
      <section className='auth'>
        <form onSubmit={handleSubmit} className='auth__form'>
          <h1 className='auth__title'>Регистрация</h1>
          <input
            value={email}
            onChange={onChange}
            name='email'
            type='email'
            className='auth__input'
            placeholder='Email'
          />
          <input
            value={password}
            onChange={onChange}
            name='password'
            type='password'
            className='auth__input'
            placeholder='Пароль'
          />
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
