import * as DOM from '../../modules/DOM.js';
import renderCheckoutShipping from '../../modules/view/renderCheckoutShipping.js';

DOM.shippingContainer.addEventListener('click', e => {
  const shippingItem = e.target.closest('.shipping__item');
  const icons = Array.from(DOM.shippingContainer.querySelectorAll('.icon'));
  const activeIcon = icons.find(item => item.name === 'radio-button-on');

  if (shippingItem) {
    activeIcon.name = 'radio-button-off';
    shippingItem.querySelector('.icon').name = 'radio-button-on';
    DOM.applyShipping.dataset.id = shippingItem.dataset.id;
  }
});

DOM.applyShipping.addEventListener('click', () => {
  const url = new URL(window.location.href);
  const queryID = url.searchParams.get('addressID');
  if (queryID) {
    location.assign(
      `http://127.0.0.1:5500/src/checkout.html?addressID=${queryID}&shippingID=${DOM.applyShipping.dataset.id}`
    );
  } else {
    location.assign(
      `http://127.0.0.1:5500/src/checkout.html?addressID=1&shippingID=${DOM.applyShipping.dataset.id}`
    );
  }
});

const init = async () => {
  await renderCheckoutShipping(DOM.shippingContainer);
};
window.addEventListener('DOMContentLoaded', init);
