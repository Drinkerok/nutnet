import { Media } from './../utils/vars';
import { throttle, getViewportWidth } from './../utils/utils';

const headerEl = document.querySelector('.page-header');
const burgerEl = headerEl.querySelector('.burger');
const hiddenDescriptionEl = burgerEl.querySelector('.visually-hidden');
const menuEl = headerEl.querySelector('.main-navigation');

let isOpen = headerEl.classList.contains('page-header--menu-open');

function openMenu () {
  headerEl.classList.add('page-header--menu-open');
  isOpen = true;
  document.body.classList.add('no-scroll');
  hiddenDescriptionEl.textContent = 'Close menu';
  window.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByClickOutside);
  window.addEventListener('resize', resizeHandler);
}

function closeMenu () {
  headerEl.classList.remove('page-header--menu-open');
  isOpen = false;
  document.body.classList.remove('no-scroll');
  hiddenDescriptionEl.textContent = 'Open menu';
  window.removeEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByClickOutside);
  window.removeEventListener('resize', resizeHandler);
}

function closeByEsc (evt) {
  if (evt.key === 'Escape') {
    closeMenu();
  }
}

const resizeHandler = throttle(() => {
  if (getViewportWidth() >= Media.tablet) {
    closeMenu();
  }
}, 300);

function closeByClickOutside (evt) {
  if (evt.target !== menuEl
    && evt.target !== burgerEl
    && !evt.target.closest('.main-navigation')
    && !evt.target.closest('.burger')
  ) {
    closeMenu();
  }
}

burgerEl.addEventListener('click', () => {
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

export const burger = {
  close () {
    closeMenu();
  },
};
