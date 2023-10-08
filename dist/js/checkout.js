import * as DOM from '../../modules/DOM.js';
import renderCheckoutAddress from '../../modules/view/renderCheckoutAddress.js';
import renderCheckoutOrder from '../../modules/view/renderCheckoutOrder.js';
import renderCheckoutShipping from '../../modules/view/renderCheckoutShipping.js';
import getData from '../../modules/model/getData.js';

const showAddressItem = async () => {
  const url = new URL(window.location.href);
  const addressID = url.searchParams.get('addressID');

  await renderCheckoutAddress(DOM.addressBox, addressID ? addressID : 1);
};

const showShippingItem = async () => {
  const url = new URL(window.location.href);
  const shippingID = url.searchParams.get('shippingID');

  if (!shippingID) return;

  await renderCheckoutShipping(DOM.shippingBox, shippingID);
};

DOM.checkoutBody.addEventListener('click', e => {
  // Address
  if (e.target.classList.contains('checkout__address--selection')) {
    location.assign('http://127.0.0.1:5500/src/checkout-address.html');
  }

  // Shipping
  const shippingItem = e.target.closest('.checkout__shipping--selection');

  if (shippingItem) {
    const url = new URL(window.location.href);
    const queryID = url.searchParams.get('addressID');
    if (queryID) {
      location.assign(
        `http://127.0.0.1:5500/src/checkout-shipping.html?addressID=${queryID}`
      );
    } else {
      location.assign(
        `http://127.0.0.1:5500/src/checkout-shipping.html?addressID=1`
      );
    }
  }

  if (e.target.id === 'discount__close') {
    DOM.discountItem.classList.add('hidden');
    DOM.discountInput.classList.remove('hidden');
  }
});

DOM.discountForm.addEventListener('submit', async e => {
  e.preventDefault();
  const discountCodes = await getData('discountCodes');
  const discountCheck = discountCodes.find(
    item => item.code === DOM.discountInput.value
  );

  if (discountCheck) {
    DOM.discountInput.classList.add('hidden');
    DOM.discountAlert.classList.add('hidden');
    DOM.discountItem.classList.remove('hidden');
    DOM.discountItem.classList.add('flex');
    DOM.discountItem.querySelector(
      'p'
    ).textContent = `Discount ${discountCheck.discount}% Off`;
  } else {
    DOM.discountAlert.classList.remove('hidden');
    DOM.discountAlert.classList.add('block');
  }
});

const init = async () => {
  await showAddressItem();
  await renderCheckoutOrder(DOM.orderBox);
  await showShippingItem();
};
window.addEventListener('DOMContentLoaded', init);
