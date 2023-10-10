import * as DOM from '../../modules/DOM.js';
import getData from '../../modules/model/getData.js';
import { textFormatter, numberFormatter } from '../model/formatter.js';
import { changeProductBg } from '../helpers.js';

const renderWishProducts = async filterName => {
  let products;

  if (filterName) {
    products = await getData('products', 'brand', filterName);
  } else {
    products = await getData('products');
  }

  const wishList = products.filter(product => {
    return product.favorite;
  });

  DOM.wishProducts.innerHTML = '';
  if (wishList.length < 1) {
    const html = `
    <section id="no__orders" style="grid-column: 1/span2">
    <div
      class="flex flex-col items-center justify-center my-20 text-sm text-center gap-2"
    >
      <img
        class="w-40 h-40 mb-5"
        src="../assets/content/notfound.png"
        alt="notfound"
      />
      <h3 class="font-bold text-lg">This Brand is empty !</h3>
      <p class="text-sm px-7">
        You can search for other Brands.
      </p>
    </div>
  </section>
    `;

    DOM.wishProducts.insertAdjacentHTML('beforeend', html);
  }

  wishList.forEach(item => {
    const html = `
          <article class="flex flex-col gap-1 overflow-hidden">
            <a
              href="http://127.0.0.1:5500/src/product-details.html?id=${
                item.id
              }"
              class="w-40 h-40 flex justify-center items-center rounded-3xl overflow-hidden relative"
            >
              <img
                class="w-full"
                src="${item.images[0].imgSrc}"
                alt="${item.title}"
              />
              <span
                class="absolute top-3 right-3 bg-tag rounded-full w-6 h-6 flex justify-center items-center p-1"
                ><ion-icon class="text-white" name="heart"></ion-icon
              ></span>
            </a>
            <h3 class="font-bold mt-1 whitespace-nowrap">
              ${textFormatter(item.title, 14)}
            </h3>
            <div class="flex items-center gap-3 mt-1 text-[.6rem]">
              <span class="flex items-center gap-1">
                <img
                  width="16"
                  height="16"
                  src="https://img.icons8.com/plumpy/24/star-half-empty.png"
                  alt="star-half-empty"
                />

                ${item.rating}</span
              >
              <span>|</span>
              <span class="bg-gray-200 py-1 px-2 rounded-md">${
                item.soldCount
              } sold</span>
            </div>
            <span class="font-semibold text-sm">${numberFormatter(
              item.price
            )}</span>
          </article>
    `;

    DOM.wishProducts.insertAdjacentHTML('beforeend', html);
  });

  const cartBoxImage = document.querySelectorAll('.cart__image');
  cartBoxImage.forEach(item => {
    changeProductBg(item, item.dataset.brand);
  });
};

export default renderWishProducts;
