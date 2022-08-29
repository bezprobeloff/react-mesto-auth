import React, { useState } from 'react';

const Login = ({ onLogin }) => {
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

    onLogin({ email, password }).then(() => {});
  };

  return (
    <main className='content'>
      <section className='auth'>
        <form onSubmit={handleSubmit} className='auth__form'>
          <h1 className='auth__title'>Вход</h1>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            className='auth__input'
            placeholder='Email'
          />
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            className='auth__input'
            placeholder='Пароль'
          />
          <button type='submit' className='auth__button-submit'>
            Войти
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
