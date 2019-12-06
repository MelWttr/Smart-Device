
'use strict'

// реализация открытия/закрытия меню разделов 'contacts' в футере

const mobileScreen = '(max-width: 767px)';
const escCode = 27;

let footerNav = document.querySelector('.footer__menu--navigation');
let footerContacts = document.querySelector('.footer__menu--contacts');

footerContacts.classList.remove('footer__menu--nojs');
footerNav.classList.remove('footer__menu--nojs');

let accordeon = (menuToOpen, menuToClose) => {
  let opened = 'footer__menu--opened';
  let closed = 'footer__menu--closed';
  if (menuToOpen.classList.contains(opened) && menuToClose.classList.contains(opened)) {
    menuToClose.classList.remove(opened);
    menuToClose.classList.add(closed);
  }
}

let toggleMenu = (menu) => {
  menu.classList.toggle('footer__menu--closed');
  menu.classList.toggle('footer__menu--opened');
}


let toggleButtonHandler = () => {

  let footerNavBtn = document.querySelector('.footer__button--nav');
  let footerContactsBtn = document.querySelector('.footer__button--contacts');

  if (footerNav && footerNavBtn) {
    footerNavBtn.addEventListener('click', () => {
      toggleMenu(footerNav);
      accordeon(footerNav, footerContacts);
    });
  }

  if (footerContacts && footerContactsBtn) {
    footerContactsBtn.addEventListener('click', () => {
      toggleMenu(footerContacts);
      accordeon(footerContacts, footerNav);
    });
  }
}

function queryMatchHandler(mediaQuery) {
  if (mediaQuery.matches) {
    toggleButtonHandler();
  }
}

if (matchMedia) {
  const mediaQuery = window.matchMedia(mobileScreen);
  queryMatchHandler(mediaQuery);
  mediaQuery.addListener(toggleButtonHandler);
}


// реализация открытия/закрытия попапа

let openButton = document.querySelector('.button--open-popup');
let modal = document.querySelector('.modal');
let overlay = modal.querySelector('.modal__overlay');
let closeBtn = modal.querySelector('.popup__button');
let body = document.querySelector('body');

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
  body.style.overflow = 'hidden';
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
  body.style.overflow = 'auto';
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

// плавный скролл

let scrollTo = () => {
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if ((link.href && link.href.indexOf('#') != -1) && ((link.pathname == location.pathname) || ('/' + link.pathname == location.pathname)) && (link.search == location.search)) {
      link.addEventListener('click', scrollAnchors);
    }
  }
}

let scrollAnchors = (e, respond = null) => {
  const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
  e.preventDefault();
  var targetID = (respond) ? respond.getAttribute('href') : e.target.getAttribute('href');
  const targetAnchor = document.querySelector(targetID);
  if (!targetAnchor) return;
  const originalTop = distanceToTop(targetAnchor);
  window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
  const checkIfDone = setInterval(function () {
    const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
    if (distanceToTop(targetAnchor) === 0 || atBottom) {
      targetAnchor.tabIndex = '-1';
      window.history.pushState('', '', targetID);
      clearInterval(checkIfDone);
    }
  }, 100);
}

scrollTo();
