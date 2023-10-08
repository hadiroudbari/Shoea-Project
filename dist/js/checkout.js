import * as DOM from '../../modules/DOM.js';
import renderAddress from '../../modules/view/renderAddress.js';
import renderCartItem from '../../modules/view/renderCartItem.js';
import editData from '../../modules/model/editData.js';

const showAddressItem = async () => {
  const url = new URL(window.location.href);
  const addressID = url.searchParams.get('addressID');

  await renderAddress(DOM.addressBox, addressID ? addressID : 1);
};

DOM.checkoutBody.addEventListener('click', e => {
  if (e.target.classList.contains('checkout__address--selection')) {
    location.assign('http://127.0.0.1:5500/src/checkout-address.html');
  }
});

const init = async () => {
  await showAddressItem();
};
window.addEventListener('DOMContentLoaded', init);
