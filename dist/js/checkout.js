import * as DOM from '../../modules/DOM.js';
import renderCheckoutAddress from '../../modules/view/renderCheckoutAddress.js';
import renderCheckoutOrder from '../../modules/view/renderCheckoutOrder.js';
import renderCartItem from '../../modules/view/renderCartItem.js';
import editData from '../../modules/model/editData.js';

const showAddressItem = async () => {
  const url = new URL(window.location.href);
  const addressID = url.searchParams.get('addressID');

  await renderCheckoutAddress(DOM.addressBox, addressID ? addressID : 1);
};

DOM.checkoutBody.addEventListener('click', e => {
  if (e.target.classList.contains('checkout__address--selection')) {
    location.assign('http://127.0.0.1:5500/src/checkout-address.html');
  }
});

const init = async () => {
  await showAddressItem();
  await renderCheckoutOrder(DOM.orderBox);
};
window.addEventListener('DOMContentLoaded', init);
