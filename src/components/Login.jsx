import React from 'react';

const Login = () => {
  return (
    <main className='content'>
      <section className='auth'>
        <form action='' className='auth__form'>
          <h1 className='auth__title'>Вход</h1>
          <input type='email' className='auth__input' placeholder='Email' />
          <input type='password' className='auth__input' placeholder='Пароль' />
          <button type='submit' className='auth__button-submit'>
            Войти
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
