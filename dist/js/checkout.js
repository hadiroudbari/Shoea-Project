import * as DOM from '../../modules/DOM.js';
import renderCheckoutAddress from '../../modules/view/renderCheckoutAddress.js';
import renderCheckoutOrder from '../../modules/view/renderCheckoutOrder.js';
import renderCheckoutShipping from '../../modules/view/renderCheckoutShipping.js';
import renderCartItem from '../../modules/view/renderCartItem.js';
import editData from '../../modules/model/editData.js';

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
});

const init = async () => {
  await showAddressItem();
  await renderCheckoutOrder(DOM.orderBox);
  await showShippingItem();
};
window.addEventListener('DOMContentLoaded', init);
