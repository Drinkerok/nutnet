import { createSwiper } from './../components/slider';

(() => {
  const blockEl = document.querySelector('.reviews');
  if (!blockEl) {
    return;
  }

  const listEl = blockEl.querySelector('.reviews__list');

  createSwiper({
    listEl,
    itemClass: 'reviews__item',
    options: {
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 0,
    },
    imgPagination: true,
  });
})();
