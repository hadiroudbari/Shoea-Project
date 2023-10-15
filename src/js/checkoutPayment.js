import * as DOM from '../../modules/DOM.js';
import renderCheckoutPayment from '../../modules/view/renderCheckoutPayment.js';

DOM.paymentContainer.addEventListener('click', e => {
  const paymentItem = e.target.closest('.payment__item');
  const icons = Array.from(DOM.paymentContainer.querySelectorAll('.icon'));
  const activeIcon = icons.find(item => item.name === 'radio-button-on');

  if (paymentItem) {
    activeIcon.name = 'radio-button-off';
    paymentItem.querySelector('.icon').name = 'radio-button-on';
    DOM.applyPayment.dataset.id = paymentItem.dataset.id;
  }
});

DOM.applyPayment.addEventListener('click', () => {
  const url = new URL(window.location.href);
  const queryAddressID = url.searchParams.get('addressID');
  const queryShippingID = url.searchParams.get('shippingID');
  const queryDiscount = url.searchParams.get('discount');
  const queryTotalPrice = url.searchParams.get('totalPrice');

  location.assign(
    `http://127.0.0.1:5500/src/confirm.html?addressID=${queryAddressID}&shippingID=${queryShippingID}&discount=${queryDiscount}&totalPrice=${queryTotalPrice}&paymentID=${DOM.applyPayment.dataset.id}`
  );
});

const init = async () => {
  await renderCheckoutPayment(DOM.paymentContainer);
};
window.addEventListener('DOMContentLoaded', init);
