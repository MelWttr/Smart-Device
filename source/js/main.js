'use strict'
const mobileScreen = '(max-width: 767px)';
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


