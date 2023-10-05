import getData from '../../modules/helpers/getData.js';
import getSingleData from '../../modules/helpers/getSingleData.js';

const loadProducts = async () => {
  const products = await getData('products');
  setTimeout(() => {
    location.assign('http://127.0.0.1:5500/src/onboarding-welcome.html');
  }, 2000);
};
loadProducts();
