import * as DOM from '../../modules/DOM.js';
import renderCartItem from '../../modules/view/renderCartItem.js';
import editData from '../../modules/model/editData.js';
import { numberFormatter } from '../../modules/model/formatter.js';

DOM.cartBox.addEventListener('click', async e => {
  e.preventDefault();
  const productCart = e.target.closest('.product__cart');
  const productCartCount = productCart.querySelector('#product__order--count');
  const productCartPrice = productCart.querySelector('#cart__price');

  if (
    e.target.id === 'product__order--plus' ||
    e.target.id === 'product__order--minus'
  ) {
    if (e.target.id === 'product__order--plus') {
      if (+productCartCount.textContent === +productCartCount.dataset.count)
        return;
      productCartCount.textContent = +productCartCount.textContent + 1;
    } else if (e.target.id === 'product__order--minus') {
      if (+productCartCount.textContent === 1) return;
      productCartCount.textContent = +productCartCount.textContent - 1;
    }

    productCartPrice.textContent = numberFormatter(
      productCartPrice.dataset.price,
      productCartCount.textContent
    );
  }

  await editData('cart', productCart.dataset.id, {
    count: +productCartCount.textContent,
  });
});

window.addEventListener('DOMContentLoaded', async () => {
  await renderCartItem();
});
