import * as DOM from '../../modules/DOM.js';
import renderCartItem from '../../modules/view/renderCartItem.js';
import editData from '../../modules/model/editData.js';
import { numberFormatter } from '../../modules/model/formatter.js';
import {
  calcTotalPrice,
  showDeleteModal,
  hideDeleteModal,
} from '../../modules/helpers.js';
import renderDeletedItem from '../../modules/view/renderDeletedItem.js';
import deleteData from '../../modules/model/deleteData.js';

DOM.cartBox.addEventListener('click', async e => {
  const productCart = e.target.closest('.product__cart');
  const productCartCount = productCart?.querySelector('.product__order--count');
  const productCartPrice = productCart?.querySelector('.cart__price');

  if (
    e.target.classList.contains('product__order--plus') ||
    e.target.classList.contains('product__order--minus')
  ) {
    if (e.target.classList.contains('product__order--plus')) {
      if (+productCartCount.textContent === +productCartCount.dataset.count)
        return;
      productCartCount.textContent = +productCartCount.textContent + 1;
    } else if (e.target.classList.contains('product__order--minus')) {
      if (+productCartCount.textContent === 1) {
        showDeleteModal();
        await renderDeletedItem(productCart.dataset.id);
      } else {
        productCartCount.textContent = +productCartCount.textContent - 1;
      }
    }

    productCartPrice.textContent = numberFormatter(
      productCartPrice.dataset.price,
      productCartCount.textContent
    );

    await editData('cart', productCart.dataset.id, {
      count: +productCartCount.textContent,
    });

    calcTotalPrice(DOM.cartBox, DOM.cartTotalPrice);
  }

  if (e.target.classList.contains('delete')) {
    showDeleteModal();
    await renderDeletedItem(productCart.dataset.id);
  }
});

DOM.overlay.addEventListener('click', e => {
  hideDeleteModal();
});

DOM.deleteCancelBtn.addEventListener('click', e => {
  hideDeleteModal();
});

DOM.deleteRemoveBtn.addEventListener('click', async () => {
  const productID = document.querySelector('#deleted__item').dataset.id;
  await deleteData('cart', productID);
  await renderCartItem();
  calcTotalPrice(DOM.cartBox, DOM.cartTotalPrice);
  hideDeleteModal();
});

DOM.checkoutBtn.addEventListener('click', () => {
  location.assign('http://127.0.0.1:5500/src/checkout.html');
});

window.addEventListener('DOMContentLoaded', async () => {
  await renderCartItem();
  calcTotalPrice(DOM.cartBox, DOM.cartTotalPrice);
});
