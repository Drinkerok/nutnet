import { Modal } from './modal';

export class ModalVideo {
  constructor () {
    this.modalEl = document.querySelector('.modal.modal--video');
    this.videoEl = this.modalEl.querySelector('.modal-video');
    this.modal = new Modal({ el: this.modalEl, onClose: this.destroy.bind(this), });
    this.isInit = false;
    this.videoId = null;
    this.player = null;
  }

  init () {
    const scriptEl = document.createElement('script');

    window.onYouTubeIframeAPIReady = function () {
      this.createPlayer();
    }.bind(this);
    scriptEl.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(scriptEl);
    this.isInit = true;
  }

  createPlayer () {
    this.videoEl.classList.add('modal-video--loaded');
    this.player = new window.YT.Player(this.videoEl, {
      height: '360',
      width: '640',
      videoId: this.videoId,
      events: {
        onReady (evt) {
          evt.target.playVideo();
        },
      },
    });
  }

  show (videoId) {
    this.videoId = videoId;
    if (!this.isInit) {
      this.init(videoId);
    } else {
      this.player.loadVideoById(videoId);
    }
    this.modal.show();
  }

  destroy () {
    if (!this.player) {
      return;
    }
    this.videoId = null;
    this.player.stopVideo();
    this.videoEl.classList.remove('modal-video--loaded');
  }
}
