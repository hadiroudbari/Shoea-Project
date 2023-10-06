import getData from '../../modules/model/getData.js';
import { textFormatter, numberFormatter } from '../model/formatter.js';

const renderProducts = async (container, products) => {
  if (!products) products = await getData('products');
  container.innerHTML = '';
  products.forEach(product => {
    const html = `
        <article class="flex flex-col gap-1">
          <a
            href="http://127.0.0.1:5500/src/product-details.html?id=${
              product.id
            }"
            class="w-40 h-40 flex justify-center items-center bg-gray-100 rounded-3xl overflow-hidden"
          >
            <img
              class="w-full"
              src="${product.images[0].imgSrc}"
              alt="${product.title}"
            />
          </a>
          <h3 class="font-semibold mt-1">${textFormatter(
            product.title,
            14
          )}</h3>
          <span class="font-semibold text-sm">${numberFormatter(
            product.price
          )}</span>
        </article>
    `;
    container.insertAdjacentHTML('beforeend', html);
  });
};

export default renderProducts;
