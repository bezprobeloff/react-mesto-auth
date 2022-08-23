export const formSelectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  inputTextErrorSelector: '.popup__input-error',
};

export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: 'b37c4061-07ee-4c8e-af47-35d22a87fc06',
    'Content-Type': 'application/json',
  },
};

export const userNameSelector = '.profile__name';
export const userJobSelector = '.profile__job';
export const userAvatarSelector = '.profile__avatar-image';
export const userAvatarContainer = document.querySelector(
  '.profile__avatar-container'
);
export const profileEditButton = document.querySelector(
  '.profile__button-edit'
);
export const profileAddButton = document.querySelector('.profile__button-add');
export const userNameInput = document.querySelector(
  '.popup__input_type_user-name'
);
export const userJobInput = document.querySelector(
  '.popup__input_type_user-job'
);
export const cardNameInput = document.querySelector(
  '.popup__input_type_card-name'
);
export const cardLinkInput = document.querySelector(
  '.popup__input_type_card-link'
);
export const cardNameInputErrorText = document.querySelector(
  '.popup__input-error_type_card-name'
);
export const cardLinkInputErrorText = document.querySelector(
  '.popup__input-error_type_card-link'
);

export const cardListSection = '.cards';
export const cardTemplateSelector = '.template-card';
export const viewImageSelector = '.popup__view-image';
export const viewImageDescriptionSelector = '.popup__description';
export const popupViewImageSelector = '.popup_type_view-image';
export const popupEditProfileSelector = '.popup_type_edit-profile';
export const popupAddCardSelector = '.popup_type_add-card';
export const popupConfirmSelector = '.popup_type_confirm';
export const popupUpdateAvatarSelector = '.popup_type_update-avatar';
