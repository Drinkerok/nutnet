import { ModalVideo } from './../components/modal-video';

(() => {
  const videoBlockEl = document.querySelector('.video');
  if (!videoBlockEl) {
    return;
  }

  const modalVideo = new ModalVideo();
  const videoLinkEl = videoBlockEl.querySelector('.video__link');

  videoLinkEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    modalVideo.show(videoLinkEl.dataset.video);
  });
})();
