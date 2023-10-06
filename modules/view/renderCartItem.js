import * as DOM from '../../modules/DOM.js';
import getData from '../../modules/model/getData.js';
import { lightOrDark } from '../helpers.js';
import { numberFormatter } from '../../modules/model/formatter.js';
import { changeProductBg } from '../helpers.js';

const renderCartItem = async () => {
  const cartProducts = await getData('cart');

  DOM.cartBox.innerHTML = '';
  cartProducts.forEach(cart => {
    const html = `
      <article
          data-id="${cart.id}"
          class="flex items-center gap-3 p-4 bg-white rounded-xl my-5 shadow product__cart"
        >
          <div
            data-brand="${cart.brand}"
            class="flex justify-center items-center rounded-lg w-28 h-24 cart__image"
          >
            <img class="w-24 h-16 rounded-xl" src="${cart.imgSrc}" alt="${
      cart.title
    }" />
          </div>
          <div class="flex flex-col gap-2 w-3/4">
            <div class="flex justify-between items-center">
              <h3 class="font-bold text-sm">Air Jordan 3 Retro</h3>
              <a href="#">
                <img class="w-5 h-6" src="http://127.0.0.1:5500/assets/content/bin.png" alt="delete" />
              </a>
            </div>
            <div>
              <ul class="flex items-center gap-1 text-[.6rem] text-gray-600">
                <li
                  style="background: ${cart.color}"
                  class="w-3 h-3 rounded-full flex justify-center items-center"
                ></li>
                <div class="flex items-center gap-2">
                  <li>${lightOrDark(cart.color)}</li>
                  <li>|</li>
                  <li>Size = ${cart.size}</li>
                </div>
              </ul>
            </div>
            <div class="flex justify-between items-center font-semibold">
              <span data-price="${
                cart.price
              }" id="cart__price" class="font-bold">${numberFormatter(
      cart.price,
      cart.count
    )}</span>
              <div
                class="flex items-center justify-center gap-3 text-black font-bold bg-gray-200 rounded-full"
              >
                <a href="#">
                  <svg
                    id="product__order--minus"
                    class="w-5 h-5 mt-1 cursor-pointer ml-2 py-1 pl-1 pr-1"
                    xmlns:svg="http://www.w3.org/2000/svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 125"
                  >
                    <g transform="translate(0,-952.36218)">
                      <path
                        d="m 22,996.36218 c -3.3137,0 -6,2.6862 -6,6.00002 0,3.3136 2.6863,6 6,6 l 56,0 c 3.3137,0 6,-2.6864 6,-6 0,-3.31382 -2.6863,-6.00002 -6,-6.00002 z"
                        fill="#000000"
                        fill-opacity="1"
                        marker="none"
                        visibility="visible"
                        display="inline"
                        overflow="visible"
                      />
                    </g>
                  </svg>
                </a>
                <span class="text-xs" data-count="${
                  cart.stock
                }" id="product__order--count">${cart.count}</span>
                <a href="#">
                  <svg
                    id="product__order--plus"
                    class="w-4 h-4 mt-1 cursor-pointer mr-2 py-1 pr-1 pl-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 5814 7267.5"
                  >
                    <g>
                      <path
                        class="fil0"
                        d="M538 2362l1824 0 0 -1824c0,-717 1090,-717 1090,0l0 1824 1824 0c717,0 717,1090 0,1090l-1824 0 0 1824c0,717 -1090,717 -1090,0l0 -1824 -1824 0c-717,0 -717,-1090 0,-1090z"
                      />
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </article>
    `;
    DOM.cartBox.insertAdjacentHTML('beforeend', html);
  });

  const cartBoxImage = document.querySelectorAll(
    '#cart__box article .cart__image'
  );
  cartBoxImage.forEach(item => {
    changeProductBg(item, item.dataset.brand);
  });
};

export default renderCartItem;
