import * as DOM from '../../modules/DOM.js';
import getData from '../../modules/model/getData.js';
import { lightOrDark } from '../helpers.js';
import {
  numberFormatter,
  numberExtractor,
} from '../../modules/model/formatter.js';
import { changeProductBg } from '../helpers.js';

const renderCheckoutOrder = async (container, priceAmount) => {
  const checkoutOrders = await getData('', '', '', 'users/1/cart');

  container.innerHTML = '';
  checkoutOrders.forEach(checkoutOrder => {
    const html = `
          <article
              data-id="${checkoutOrder.id}"
              class="flex items-center gap-3 p-4 bg-white rounded-xl my-5 shadow"
            >
              <div
                class="bg-gray-100 flex justify-center items-center rounded-lg w-28 h-24 cart__image"
              >
                <img
                  class="w-24 h-16 rounded-xl"
                  src="${checkoutOrder.imgSrc}"
                  alt="${checkoutOrder.title}"
                />
              </div>
              <div class="flex flex-col gap-2 w-3/4">
                <h3 class="font-bold text-sm">${checkoutOrder.title}</h3>
                <div>
                <ul class="flex items-center gap-1 text-[.6rem] text-gray-600">
                <li
                  style="background: ${checkoutOrder.color}"
                  class="w-3 h-3 rounded-full flex justify-center items-center"
                ></li>
                <div class="flex items-center gap-2">
                  <li>${
                    checkoutOrder.colorName
                      ? checkoutOrder.colorName
                      : lightOrDark(checkoutOrder.color)
                  }</li>
                  <li>|</li>
                  <li>Size = ${checkoutOrder.size}</li>
                </div>
              </ul>
                </div>
                <div class="flex justify-between items-center font-semibold">
                  <span class="font-bold cart__price">${numberFormatter(
                    checkoutOrder.price,
                    checkoutOrder.count
                  )}</span>
                  <div
                    class="flex items-center justify-center text-black font-semibold bg-gray-200 rounded-full w-7 h-7"
                  >
                  <span class="text-xs product__order--count" data-count="${
                    checkoutOrder.stock
                  }">${checkoutOrder.count}</span>
                  </div>
                </div>
              </div>
            </article>
  `;
    container.insertAdjacentHTML('beforeend', html);
  });

  const cartBoxImage = container.querySelectorAll('.cart__image');
  cartBoxImage.forEach(item => {
    changeProductBg(item, item.dataset.brand);
  });
};

export default renderCheckoutOrder;
