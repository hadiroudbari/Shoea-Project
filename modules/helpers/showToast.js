const showToast = (message, time, target, color) => {
  Toastify({
    text: message,
    duration: time * 1000,
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
