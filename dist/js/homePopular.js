import * as DOM from '../../modules/DOM.js';
import renderFilters from '../../modules/view/renderFilters.js';
import renderProducts from '../../modules/view/renderProducts.js';
import sortData from '../../modules/model/sortData.js';
import getData from '../../modules/model/getData.js';

const products = await sortData();

const showPopularProducts = async () => {
  await renderFilters();
  await renderProducts(DOM.homePopularProducts, products);
};

DOM.filterBox.addEventListener('click', async e => {
  e.preventDefault();
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
      const sortedProducts = await sortData(products);
      await renderProducts(DOM.homePopularProducts, sortedProducts);
    } else {
      await renderProducts(DOM.homePopularProducts, products);
    }
  }
});

showPopularProducts();
