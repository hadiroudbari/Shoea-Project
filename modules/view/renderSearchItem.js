import * as DOM from '../../modules/DOM.js';
import getData from '../../modules/model/getData.js';
import { textFormatter, numberFormatter } from '../model/formatter.js';
import { changeProductBg } from '../helpers.js';

const renderSearchItem = async query => {
  const searchResult = await getData(
    '',
    '',
    '',
    `products?title_like=${query.toLowerCase()}`
  );

  DOM.searchNotFoundBox.innerHTML = '';
  if (searchResult.length < 1) {
    const html = `
          <div
            class="flex flex-col items-center justify-center my-20 text-sm gap-2 text-center"
          >
            <img
              class="w-48 h-48 mb-5"
              src="../assets/content/notfound.png"
              alt="notfound"
            />
            <h3 class="font-bold text-lg">Not Found</h3>
            <p class="text-sm px-7">
              Sorry, the keyword you entered cannot be found, please check again
              or search with another keyword.
            </p>
          </div>
    `;

    DOM.searchNotFoundBox.classList.remove('hidden');
    DOM.searchNotFoundBox.insertAdjacentHTML('beforeend', html);
  }

  DOM.searchFoundBox.innerHTML = '';
  searchResult.forEach(item => {
    const html = `
          <article class="flex flex-col gap-1 overflow-hidden search__item">
            <a
              href="http://127.0.0.1:5500/src/product-details.html?id=${
                item.id
              }&search=true"
              class="w-40 h-40 flex justify-center items-center rounded-3xl overflow-hidden cart__image"
            >
              <img
                class="w-full"
                src="${item.images[0].imgSrc}"
                alt="${item.title}"
              />
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

    DOM.searchFoundBox.insertAdjacentHTML('beforeend', html);
  });

  const cartBoxImage = document.querySelectorAll('.cart__image');
  cartBoxImage.forEach(item => {
    changeProductBg(item, item.dataset.brand);
  });

  DOM.searchHeaderResult.textContent = 'Results for';
  DOM.searchHeaderWords.classList.remove('hidden');
  DOM.searchHeaderWords.textContent = `"${query}"`;
  DOM.searchHeaderClear.classList.add('hidden');
  DOM.searchHeaderFound.classList.remove('hidden');
  DOM.searchFoundCount.textContent = searchResult.length;
};

export default renderSearchItem;
