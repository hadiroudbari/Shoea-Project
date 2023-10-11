import * as DOM from '../../modules/DOM.js';
import renderCheckoutAddress from '../../modules/view/renderCheckoutAddress.js';

DOM.addressContainer.addEventListener('click', e => {
  const addressItem = e.target.closest('.address__item');
  const icons = Array.from(DOM.addressContainer.querySelectorAll('.icon'));
  const activeIcon = icons.find(item => item.name === 'radio-button-on');

  if (addressItem) {
    activeIcon.name = 'radio-button-off';
    addressItem.querySelector('.icon').name = 'radio-button-on';
    DOM.applyAddress.dataset.id = addressItem.dataset.id;
  }
});

DOM.applyAddress.addEventListener('click', () => {
  const url = new URL(window.location.href);
  const queryID = url.searchParams.get('shippingID');
  if (queryID) {
    location.assign(
      `http://127.0.0.1:5500/src/checkout.html?addressID=${DOM.applyAddress.dataset.id}&shippingID=${queryID}`
    );
  } else {
    location.assign(
      `http://127.0.0.1:5500/src/checkout.html?addressID=${DOM.applyAddress.dataset.id}`
    );
  }
});

const init = async () => {
  await renderCheckoutAddress(DOM.addressContainer);
};
window.addEventListener('DOMContentLoaded', init);
