import { TO_SECOND } from '../config.js';

const showToast = (message, time, target, color) => {
  Toastify({
    text: message,
    duration: time * TO_SECOND,
    close: true,
    gravity: 'top',
    position: 'center',
    stopOnFocus: true,
    style: {
      background: color,
    },
    callback: () => {
      location.assign(target);
    },
  }).showToast();
};

export default showToast;
