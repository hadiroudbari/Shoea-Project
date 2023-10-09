import * as DOM from '../../modules/DOM.js';
import renderOrdersItem from '../../modules/view/renderOrdersItem.js';

DOM.ordersActive.addEventListener('click', async () => {
  DOM.ordersCompleted.classList.remove('active__orders');
  DOM.ordersActive.classList.add('active__orders');

  await renderOrdersItem();
});

DOM.ordersCompleted.addEventListener('click', async () => {
  DOM.ordersActive.classList.remove('active__orders');
  DOM.ordersCompleted.classList.add('active__orders');

  await renderOrdersItem(false);
});

window.addEventListener('DOMContentLoaded', async () => {
  await renderOrdersItem();
});
