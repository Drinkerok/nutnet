export class Modal {
  constructor ({ el, onClose, }) {
    this.blockEl = el;
    this.closeEl = this.blockEl.querySelector('.modal__close');
    this.onClose = onClose;

    this.closeEl.addEventListener('click', () => {
      this.hide();
    });
    this.blockEl.addEventListener('click', (evt) => {
      if (evt.target === this.blockEl) {
        this.hide();
      }
    });

    this.hideByEsc = this.hideByEsc.bind(this);
  }

  show () {
    document.body.classList.add('no-scroll');
    this.blockEl.classList.add('modal--show');
    window.addEventListener('keydown', this.hideByEsc);
  }

  hide () {
    if (this.onClose) {
      this.onClose();
    }
    document.body.classList.remove('no-scroll');
    this.blockEl.classList.remove('modal--show');
    window.removeEventListener('keydown', this.hideByEsc);
  }

  hideByEsc (evt) {
    if (evt.key === 'Escape') {
      this.hide();
    }
  }
}
