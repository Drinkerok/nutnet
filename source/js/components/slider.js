import Swiper from 'swiper';
import { getElementFromTemplate } from './../utils/utils.js';

export const createSwiper = ({ listEl, itemClass, options, imgPagination = false, }) => {
  const slideEls = listEl.querySelectorAll(`.${itemClass}`);
  const initialSlide = Math.floor(slideEls.length / 2);
  const sliderEl = getElementFromTemplate('<div class="slider"></div>');
  const wrapperEl = getElementFromTemplate('<div class="slider__wrapper"></div>');
  sliderEl.appendChild(wrapperEl);

  listEl.before(sliderEl);
  wrapperEl.appendChild(listEl);
  listEl.classList.add('slider__list');

  const slider = new Swiper(
      wrapperEl,
      Object.assign(
          {
            slideClass: itemClass,
            initialSlide,
            wrapperClass: 'slider__list',
            spaceBetween: 24,
            slidesPerView: 1,
          },
          options)
  );

  const paginationEl = getElementFromTemplate('<div class="slider__pagination"></div>');
  if (imgPagination) {
    const bulletEls = [...slideEls].map((slideEl, index) => {
      const reviewEl = slideEl.querySelector('.review');
      const authorNameEl = reviewEl.querySelector('.review__author-name');
      const img = reviewEl.dataset.img;
      const bulletEl = getElementFromTemplate(`<button class="slider__bullet" type="button" aria-label="go to slide ${index + 1}"><img src="${img}" alt="${authorNameEl.textContent}" loading="lazy"></button>`);
      bulletEl.addEventListener('click', () => {
        slider.slideTo(index);
      });
      return bulletEl;
    });
    bulletEls[initialSlide].classList.add('slider__bullet--active');
    bulletEls.forEach((bullet) => paginationEl.appendChild(bullet));
    wrapperEl.appendChild(paginationEl);

    slider.on('slideChange', () => {
      bulletEls[slider.previousIndex].classList.remove('slider__bullet--active');
      bulletEls[slider.realIndex].classList.add('slider__bullet--active');
    });
  }

  return slider;
};
