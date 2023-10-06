import * as DOM from '../../modules/DOM.js';
import getData from '../../modules/model/getData.js';

const renderFilters = async () => {
  const brands = await getData('brands');

  DOM.filterBox.innerHTML = `
          <li data-filter="All">
            <a
              class="filter__link border-2 border-tag rounded-full py-1.5 px-4 bg-tag text-white block"
              href="#"
              >All</a
            >
          </li>
    `;
  brands.forEach(brand => {
    const htmlFilter = `
          <li data-filter="${brand.name}">
            <a
              class="filter__link block border-2 border-tag rounded-full py-1.5 px-4 whitespace-nowrap"
              href="#"
              >${brand.name}</a
            >
          </li>
    `;
    DOM.filterBox.insertAdjacentHTML('beforeend', htmlFilter);
  });
};

export default renderFilters;
