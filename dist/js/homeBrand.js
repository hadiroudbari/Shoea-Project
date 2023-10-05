import * as DOM from '../../modules/DOM.js';
import renderProducts from '../../modules/view/renderProducts.js';

const getfilterQuery = async () => {
  const url = new URL(window.location.href);
  const brandQuery = url.searchParams.get('brand');

  DOM.brandTitle.textContent =
    brandQuery.slice(0, 1).toUpperCase() + brandQuery.slice(1);

  renderProducts(DOM.homeBrandProducts, 'brand', brandQuery);
};

window.addEventListener('DOMContentLoaded', async () => {
  await getfilterQuery();
});
