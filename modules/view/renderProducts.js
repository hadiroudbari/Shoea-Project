import getData from '../../modules/model/getData.js';
import { textFormatter, numberFormatter } from '../model/formatter.js';

const renderProducts = async (container, products) => {
  if (!products) products = await getData('products');

  if (products.length < 1) {
    container.innerHTML = `
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

    return;
  }

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
