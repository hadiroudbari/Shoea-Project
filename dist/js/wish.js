import * as DOM from '../../modules/DOM.js';
import renderWishProducts from '../../modules/view/renderWishProducts.js';
import renderFilters from '../../modules/view/renderFilters.js';

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
      await renderWishProducts(filterName);
    } else {
      await renderWishProducts();
    }
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  await renderFilters();
  await renderWishProducts();
});
