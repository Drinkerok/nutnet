import { burger } from './burger';

(() => {
  const navEl = document.querySelector('.main-navigation');
  if (!navEl) {
    return;
  }

  navEl.addEventListener('click', (evt) => {
    const linkEl = evt.target.classList.contains('main-navigation__link')
      ? evt.target
      : evt.target.closest('.main-navigation__link');
    if (!linkEl) {
      return;
    }

    const anchorEl = document.querySelector(`#${linkEl.href.slice(linkEl.href.lastIndexOf('#') + 1)}`);
    if (!anchorEl) {
      return;
    }

    evt.preventDefault();
    anchorEl.scrollIntoView({ behavior: 'smooth', });
    burger.close();
  });
})();
