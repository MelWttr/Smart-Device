
'use strict'

// реализация открытия/закрытия меню разделов 'contacts' в футере

const mobileScreen = '(max-width: 767px)';
const escCode = 27;

let footerNav = document.querySelector('.footer__menu--navigation');
let footerContacts = document.querySelector('.footer__menu--contacts');

footerContacts.classList.remove('footer__menu--nojs');
footerNav.classList.remove('footer__menu--nojs');


let toggleMenu = (menu) => {
  menu.classList.toggle('footer__menu--closed');
  menu.classList.toggle('footer__menu--opened');
}

if (window.matchMedia(mobileScreen).matches) {

  let footerNavBtn = document.querySelector('.footer__button--nav');
  let footerContactsBtn = document.querySelector('.footer__button--contacts');

  if (footerNav && footerNavBtn) {
    footerNavBtn.addEventListener('click', () => {
      toggleMenu(footerNav);
    });
  }

  if (footerContacts && footerContactsBtn) {
    footerContactsBtn.addEventListener('click', () => {
      toggleMenu(footerContacts);
    });
  }
}

// реализация открытия/закрытия попапа

let openButton = document.querySelector('.button--open-popup');
let modal = document.querySelector('.modal');
let overlay = modal.querySelector('.modal__overlay');
let closeBtn = modal.querySelector('.popup__button');

let popup = modal.querySelector('.popup');
let userName = popup.querySelector('[name=username]');
let form = popup.querySelector('form');
let userPhone = popup.querySelector('[name=userphone]');
let userText = popup.querySelector('[name=usertext]');
let isStorageSupport = true;
let storageName = '';
let storagePhone = '';
let storageText = '';

let openPopup = () => {
  modal.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  if (userName, userPhone, userText) {
    if (storageName && storagePhone && storageText) {
      userName.value = storageName;
      userPhone.value = storagePhone;
      userText.value = storageText;
      userName.focus();
    } else if (storageName && storagePhone && !storageText) {
      userName.value = storageName;
      userPhone.value = storagePhone;
      userText.focus();
    } else if (!storageName && storagePhone && storageText) {
      userPhone.value = storagePhone;
      userText.value = storageText;
      userName.focus();
    } else if (storageName && !storagePhone && storageText) {
      userName.value = storagePhone;
      userText.value = storageText;
      userPhone.focus();
    } else {
      userName.focus();
    }
  }
};

let closePopup = function () {
  modal.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

let onPopupEscPress = function (evt) {
  if (evt.keyCode === escCode) {
    closePopup();
  }
};

if (modal) {
  openButton.addEventListener('click', openPopup);
  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', closePopup);
}
// реализация автозаполнения формы

try {
  storageName = localStorage.getItem('username');
  storagePhone = localStorage.getItem('userphone');
  storageText = localStorage.getItem('usertext')
} catch (error) {
  isStorageSupport = false;
}

if (form) {
  form.addEventListener('submit', (evt) => {
    if (isStorageSupport) {
      localStorage.setItem('username', userName.value);
      localStorage.setItem('userphone', userPhone.value);
      localStorage.setItem('usertext', userText.value);
    }
    form.submit();
  });
}
