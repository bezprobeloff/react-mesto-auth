<h1 align="center">Mesto Russia (React) с авторизацией и регистрацией</h1>
<p align="center">
    <img alt="Version" src="https://img.shields.io/github/package-json/v/bezprobeloff/react-mesto-auth" />
    <img alt="Quality" src="https://img.shields.io/badge/status-release-orange.svg" >
    <img alt="Made by: Bezprobeloff" src="https://img.shields.io/badge/made%20by-Bezprobeloff-blue" />
</p>

Ссылка на deploy __Mesto Russia__: https://mesto.bezprobeloff.nomoredomains.icu/

https://user-images.githubusercontent.com/44836223/196674135-e667402e-daad-4424-a7fc-a67873e0be99.mp4

**Обзор**

Проект сайта о красивых местах в России, который можно посмотреть в режиме мобильного, планшета и десктопа.
На каждом устройстве сайт адаптивно меняется для удобства и читабельности.

Данный проект является продолжением __Mesto Russia__ - https://github.com/bezprobeloff/mesto-react, но с дополнительным функционалом авторизации.

Синхронизируем данные по api - https://api.mesto.bezprobeloff.nomoredomains.icu/ . 

Исходный код бекенда и документация API на GitHub -  **[Mesto Russia (Backend)](https://github.com/bezprobeloff/express-mesto-gha/)**


Можем обмениваться информацией с сервером по REST API: добавить и удалить (только свою) карточку с подтверждением, поставить/снять лайк, обновление данных пользователя (имя, аватарка), авторизация/регистрация.

**Технологии**

Использованы следующие технологии:

* __Flexbox__
* __Grid__
* __SASS__
* Методология __БЭМ__
* __Семантическая__ вёрстка
* __Адаптивность__ с использованием "резиновости"
* __React__ технологии
  * хуки: useState, useEffect
  * кастомный хук: useInput для валидации форм
  * функциональные компоненты
  * React Router (v. 5.2.1)
  * Context

* Реализация логики, а также получение данных с сервера по __REST API__:
  * Снятие/Установка лайков
  * Добавление карточки. Удаление только своих карточек
  * Обновление/редактирование данных пользователя (имя, работа, аватарка)
  * Валидация форм
  * Открытие попапов (редактирование профиля, добавление карточки, просмотр картинки)
  * Закрытие попапов (по Esc, по overlay, по кнопке закрытия)
  * Авторизация/регистрация
  * После авторизации, перебрасывает на страницу списка карточек

**Установка**

Установить Node.js (v16.5) и запустить в корневом каталоге проекта:

###  `npm install`


**Скрипты**

###  `npm start`
Запуск в режиме разработки, в браузере автоматически откроется по такому адресу [http://localhost:8080/](http://localhost:8080/)

### `npm run build`

Сборка приложения в папку `build`
