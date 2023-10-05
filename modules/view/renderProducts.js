import getSingleData from '../../modules/helpers/getSingleData.js';
import { textFormatter, numberFormatter } from '../helpers/Formatter.js';

const renderProducts = async (container, key = '', value = '') => {
  const products = await getSingleData('products', key, value);
  container.innerHTML = '';
  products.forEach(product => {
    const html = `
        <article class="flex flex-col gap-1">
          <div
            class="w-40 h-40 flex justify-center items-center bg-gray-100 rounded-3xl overflow-hidden"
          >
            <img
              class="w-full"
              src="${product.images[0].imgSrc}"
              alt="${product.title}"
            />
          </div>
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
