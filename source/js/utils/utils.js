export function getElementFromTemplate (template, parent = 'div') {
  const parentEl = document.createElement(parent);
  parentEl.innerHTML = template;

  return parentEl.children[0];
}

export function throttle (func, ms) {
  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper (...args) {
    if (isThrottled) {
      savedArgs = args;
      savedThis = this;
      return;
    }

    func.apply(this, ...args);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

export function getViewportWidth () {
  return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
  ) - getScrollWidth();
}

function getScrollWidth () {
  const divEL = document.createElement('div');

  divEL.style.overflowY = 'scroll';
  divEL.style.width = '50px';
  divEL.style.height = '50px';

  document.body.appendChild(divEL);
  const scrollWidth = divEL.offsetWidth - divEL.clientWidth;
  divEL.remove();

  return scrollWidth;
}
