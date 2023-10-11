import * as DOM from '../../modules/DOM.js';
import renderOrdersItem from '../../modules/view/renderOrdersItem.js';
import getData from '../../modules/model/getData.js';
import postData from '../../modules/model/postData.js';

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

DOM.ordersContainer.addEventListener('click', async e => {
  if (e.target.dataset.active === 'false') {
    const parentElement = e.target.closest('.order__item');

    const product = await getData('orders', 'id', parentElement.dataset.order);

    const currentItem = product[0].cart.find(
      item => item.id === +parentElement.dataset.id
    );

    postData('cart', currentItem);
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  await renderOrdersItem();
});
