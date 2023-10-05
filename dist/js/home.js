import * as DOM from '../../modules/DOM.js';
import getData from '../../modules/helpers/getData.js';
import renderProducts from '../../modules/view/renderProducts.js';
import renderFilters from '../../modules/view/renderFilters.js';
import { textFormatter } from '../../modules/helpers/Formatter.js';

const showUserInfo = async () => {
  const currnetUser = await getData('loggedUser');

  DOM.userImage.src = currnetUser[0].userImage;
  DOM.userFullname.textContent = `${currnetUser[0].firstName} ${currnetUser[0].lastName}`;
};

DOM.inputSearch.addEventListener('focus', e => {
  location.assign('http://127.0.0.1:5500/src/search.html');
});

const showBrands = async () => {
  const brands = await getData('brands');
  brands.slice().sort((a, b) => b.id - a.id);

  DOM.brandsBox.innerHTML = `
          <figure data-brand="More" class="flex flex-col items-center gap-2">
            <div
              style="width:48px !important;height:48px !important";
              class="flex justify-center items-center rounded-full bg-gray-200 cursor-pointer"
            >
              <ion-icon
                class="text-2xl"
                name="ellipsis-horizontal-circle-outline"
              ></ion-icon>
            </div>
            <figcaption class="text-xs font-semibold">More</figcaption>
          </figure>
  `;

  brands.forEach(brand => {
    const html = `
          <figure data-brand="${
            brand.name
          }" class="flex flex-col justify-start items-center gap-2">
            <div
              class="brand__item flex justify-center items-center rounded-full bg-gray-200 cursor-pointer"
            >
              <img
                style="width:48px !important;height:48px !important";
                class="rounded-full p-2"
                src="${brand.img}"
                alt="${brand.name}"
              />
            </div>
            <figcaption class="text-xs font-semibold">${textFormatter(
              brand.name,
              8
            )}</figcaption>
          </figure>
    `;
    DOM.brandsBox.insertAdjacentHTML('afterbegin', html);
  });
};

DOM.brandsBox.addEventListener('click', e => {
  const brandName = e.target.closest('figure').dataset.brand;
  if (e.target.closest('div').classList.contains('brand__item')) {
    location.assign(
      `http://127.0.0.1:5500/src/home-brand.html?brand=${brandName.toLowerCase()}`
    );
  }
});

DOM.filterBox.addEventListener('click', async e => {
  const filterName = e.target.closest('li').dataset.filter.toLowerCase();
  const filterLinks = document.querySelectorAll('.filter__link');
  filterLinks.forEach(filter => {
    filter.classList.remove('bg-tag', 'text-white');
    filter.classList.add('text-black');
  });

  if (e.target.classList.contains('filter__link')) {
    e.target.classList.add('bg-tag', 'text-white');

    if (filterName !== 'all') {
      const products = await getData('products', 'brand', filterName);
      await renderProducts(DOM.homeProducts, products);
    } else {
      await renderProducts(DOM.homeProducts);
    }
  }
});

const init = async () => {
  await showUserInfo();
  await showBrands();
  await renderFilters();
  await renderProducts(DOM.homeProducts);
};

window.addEventListener('DOMContentLoaded', init);
