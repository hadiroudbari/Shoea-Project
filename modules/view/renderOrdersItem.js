import * as DOM from '../../modules/DOM.js';
import getData from '../../modules/model/getData.js';
import { lightOrDark } from '../helpers.js';
import { numberFormatter } from '../../modules/model/formatter.js';
import { changeProductBg } from '../helpers.js';

const renderOrdersItem = async (active = true) => {
  const user = await getData('loggedUser');
  const ordersProducts = await getData(
    '',
    '',
    '',
    `users/${user[0].id}/orders?active=${active}`
  );

  DOM.ordersContainer.innerHTML = '';
  if (ordersProducts.length < 1) {
    const html = `
          <div
            class="flex flex-col items-center justify-center my-20 text-sm text-center gap-2"
          >
            <img
              class="w-40 h-40 mb-5"
              src="../assets/content/notfound.png"
              alt="notfound"
            />
            <h3 class="font-bold text-lg">You don't have an order yet</h3>
            <p class="text-sm px-7">
              You don't have an active orders at this time
            </p>
          </div>
    `;
    DOM.ordersContainer.insertAdjacentHTML('beforeend', html);

    return;
  }

  ordersProducts.forEach(order => {
    order.cart.forEach(cartItem => {
      const html = `
      <article
        data-orderId="${order.id}"
        data-id="${cartItem.id}"
        class="flex items-center gap-3 p-4 bg-white rounded-xl my-5 shadow"
      >
        <a
          href="http://127.0.0.1:5500/src/product-details.html?id=${
            cartItem.productId
          }"
          style="width:35%"
          data-brand="${cartItem.brand}"
          class="flex justify-center items-center rounded-lg w-28 h-24 cart__image"
        >
          <img
            class="w-24 h-16 rounded-xl"
            src="${cartItem.imgSrc}"
            alt="${cartItem.title}"
          />
        </a>
        <div style="width:65%" class="flex flex-col gap-1 w-3/4">
          <h3 class="font-bold text-sm">${cartItem.title}</h3>
          <div>
          <ul class="flex items-center gap-1 text-[.6rem] text-gray-600">
            <li
              style="background: ${cartItem.color}"
              class="w-3 h-3 rounded-full flex justify-center items-center"
            ></li>
            <div class="flex items-center gap-2">
              <li>${
                !cartItem.colorName
                  ? lightOrDark(cartItem.color)
                  : cartItem.colorName
              }</li>
              <li>|</li>
              <li>Size = ${cartItem.size}</li>
              <li>|</li>
              <li>Qty = ${cartItem.count}</li>
            </div>
          </ul>
          </div>
          <span
            class="text-[.6rem] bg-gray-200 w-fit py-1 px-2 rounded-md font-semibold mt-1"
            >${order.status}</span
          >
          <div class="flex justify-between items-center font-semibold">
            <span class="font-bold">${numberFormatter(
              cartItem.price,
              cartItem.count
            )}</span>
            <button
              class="bg-black text-white rounded-full py-1 px-4 text-xs font-semibold"
            >
              ${order.active ? 'Track Order' : 'Buy Again'}
            </button>
          </div>
        </div>
      </article>
`;

      DOM.ordersContainer.insertAdjacentHTML('beforeend', html);
    });
  });

  const cartBoxImage = document.querySelectorAll('.cart__image');
  cartBoxImage.forEach(item => {
    changeProductBg(item, item.dataset.brand);
  });
};

export default renderOrdersItem;
