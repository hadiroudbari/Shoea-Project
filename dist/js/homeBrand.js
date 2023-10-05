import * as DOM from '../../modules/DOM.js';
import renderProducts from '../../modules/view/renderProducts.js';
import getData from '../../modules/helpers/getData.js';

const getfilterQuery = async () => {
  const url = new URL(window.location.href);
  const brandQuery = url.searchParams.get('brand');
  const products = await getData('products', 'brand', brandQuery);

  DOM.brandTitle.textContent =
    brandQuery.slice(0, 1).toUpperCase() + brandQuery.slice(1);

  await renderProducts(DOM.homeBrandProducts, products);
};

window.addEventListener('DOMContentLoaded', async () => {
  await getfilterQuery();
});
