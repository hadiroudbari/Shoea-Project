import * as DOM from '../../modules/DOM.js';
import renderCheckoutAddress from '../../modules/view/renderCheckoutAddress.js';
import renderCheckoutOrder from '../../modules/view/renderCheckoutOrder.js';
import renderCheckoutShipping from '../../modules/view/renderCheckoutShipping.js';
import getData from '../../modules/model/getData.js';
import { calcTotalPrice } from '../../modules/helpers.js';

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
  const shippingPriceItem = document.querySelector('#shipping__price');
  DOM.priceShipping.innerHTML = '$' + shippingPriceItem.dataset.price;
  calcTotalPrice(DOM.orderBox, DOM.priceTotal, shippingPriceItem.dataset.price);
  DOM.checkoutPaymentBtn.disabled = false;
  DOM.checkoutPaymentBtn.classList.remove('opacity-50');
};

DOM.checkoutBody.addEventListener('click', e => {
  // Address
  const addressItem = e.target.closest('.checkout__address--selection');

  if (addressItem) {
    const url = new URL(window.location.href);
    const queryID = url.searchParams.get('shippingID');
    if (queryID) {
      location.assign(
        `http://127.0.0.1:5500/src/checkout-address.html?shippingID=${queryID}`
      );
    } else {
      location.assign(`http://127.0.0.1:5500/src/checkout-address.html`);
    }
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
    DOM.discountBtn.innerHTML = '+';
    DOM.discountBtn.disabled = false;
    DOM.discountItem.classList.add('hidden');
    DOM.discountInput.classList.remove('hidden');
    DOM.pricePromoBox.classList.add('hidden');
    DOM.pricePromo.innerHTML = '';
    const shippingPriceItem = document.querySelector('#shipping__price');
    calcTotalPrice(
      DOM.orderBox,
      DOM.priceTotal,
      shippingPriceItem.dataset.price
    );
  }
});

DOM.discountForm.addEventListener('submit', async e => {
  e.preventDefault();
  const discountCodes = await getData('discountCodes');
  const discountCheck = discountCodes.find(
    item => item.code === DOM.discountInput.value
  );

  if (discountCheck) {
    DOM.discountBtn.innerHTML = '<ion-icon name="checkmark"></ion-icon>';
    DOM.discountBtn.disabled = true;
    DOM.discountInput.classList.add('hidden');
    DOM.discountAlert.classList.add('hidden');
    DOM.discountItem.classList.remove('hidden');
    DOM.discountItem.classList.add('flex');
    DOM.discountItem.querySelector(
      'p'
    ).textContent = `Discount ${discountCheck.discount}% Off`;

    const shippingPriceItem = document.querySelector('#shipping__price');
    const calculatedPrice = calcTotalPrice(DOM.orderBox);
    const discountAmount = (calculatedPrice * discountCheck.discount) / 100;

    DOM.pricePromoBox.classList.remove('hidden');
    DOM.pricePromoBox.classList.add('flex');
    DOM.pricePromo.innerHTML = '- $' + discountAmount;
    DOM.pricePromo.dataset.promo = discountAmount;

    calcTotalPrice(
      DOM.orderBox,
      DOM.priceTotal,
      shippingPriceItem.dataset.price,
      discountAmount
    );

    // DOM.discountForm.reset();
  } else {
    DOM.discountAlert.classList.remove('hidden');
    DOM.discountAlert.classList.add('block');
  }
});

DOM.checkoutPaymentBtn.addEventListener('click', () => {
  const url = new URL(window.location.href);
  const queryAddressID = url.searchParams.get('addressID');
  const queryShippingID = url.searchParams.get('shippingID');

  location.assign(
    `http://127.0.0.1:5500/src/checkout-payment.html?addressID=${queryAddressID}&shippingID=${queryShippingID}&discount=$${DOM.pricePromo.dataset.promo}&totalPrice=${DOM.priceTotal.innerHTML}`
  );
});

const checkCart = () => {
  const carts = document.querySelectorAll('.order__cart');
  if (carts.length < 1) {
    location.assign(`http://127.0.0.1:5500/src/cart.html`);
  }
};

const init = async () => {
  await showAddressItem();
  await renderCheckoutOrder(DOM.orderBox);
  calcTotalPrice(DOM.orderBox, DOM.priceAmount);
  await showShippingItem();
  checkCart();
};
window.addEventListener('DOMContentLoaded', init);
