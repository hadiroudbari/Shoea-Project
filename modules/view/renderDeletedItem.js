import * as DOM from '../../modules/DOM.js';
import getData from '../../modules/model/getData.js';
import { lightOrDark } from '../helpers.js';
import { numberFormatter } from '../../modules/model/formatter.js';
import { changeProductBg } from '../helpers.js';

const renderDeletedItem = async ID => {
  const cartProductArray = await getData('cart', 'id', ID);
  const cartProduct = cartProductArray[0];

  DOM.deleteBox.innerHTML = '';
  const html = `
      <article
          id="deleted__item"
          data-id="${ID}"
          class="flex items-center gap-3 p-4 bg-white rounded-xl my-5 shadow"
        >
          <div
            data-brand="${cartProduct.brand}"
            class="flex justify-center items-center rounded-lg w-28 h-24 cart__image"
          >
            <img class="w-24 h-16 rounded-xl" src="${
              cartProduct.imgSrc
            }" alt="${cartProduct.title}" />
          </div>
          <div class="flex flex-col gap-2 w-3/4">
            <div class="flex justify-between">
              <h3 class="font-bold text-sm">${cartProduct.title}</h3>
            </div>
            <div>
              <ul class="flex items-center gap-1 text-[.6rem] text-gray-600">
                <li
                  style="background: ${cartProduct.color}"
                  class="w-3 h-3 rounded-full flex justify-center items-center"
                ></li>
                <div class="flex items-center gap-2">
                  <li>${
                    cartProduct.colorName === 'undefined' ||
                    !cartProduct.colorName
                      ? lightOrDark(cartProduct.color)
                      : cartProduct.colorName
                  }</li>
                  <li>|</li>
                  <li>Size = ${cartProduct.size}</li>
                </div>
              </ul>
            </div>
            <div class="flex justify-between items-center font-semibold">
            <span data-price="${
              cartProduct.price
            }" class="font-bold cart__price">${numberFormatter(
    cartProduct.price,
    cartProduct.count
  )}</span>
              <div
                class="flex items-center justify-center gap-3 text-black font-bold bg-gray-200 rounded-full py-1 px-3"
              >
                <span class="text-xs product__order--count" data-count="${
                  cartProduct.stock
                }">${cartProduct.count}</span>
              </div>
            </div>
          </div>
        </article>
  `;
  DOM.deleteBox.insertAdjacentHTML('beforeend', html);

  const cartBoxImage = document.querySelector(
    '#delete__box article .cart__image'
  );
  changeProductBg(cartBoxImage, cartBoxImage.dataset.brand);
};

export default renderDeletedItem;
