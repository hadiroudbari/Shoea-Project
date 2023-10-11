import { textFormatter, numberFormatter } from '../model/formatter.js';
import renderProductSize from './renderProductSize.js';
import renderProductColor from './renderProductColor.js';
import renderProductImage from './renderProductImage.js';
import { changeProductBg } from '../helpers.js';
import { DIGITS_NUMBER } from '../config.js';

const renderProductDetails = async (container, product) => {
  // Fix Background Image for UI
  const containerHeader = container.querySelector('header');
  changeProductBg(containerHeader, product.brand);

  // Render Image
  renderProductImage(product, product.images[0].id);

  // Render Title
  const detailsTitleBox = container.querySelector(
    '#product__details--title h2'
  );
  detailsTitleBox.textContent = product.title;

  // Render Favorite
  const favoriteBtn = container.querySelector('#favorite__btn');
  if (product.favorite) {
    favoriteBtn.name = 'heart';
    favoriteBtn.classList.add('text-red-500');
  }

  // Render Info Sold
  const detailsInfoBoxSold = container.querySelector(
    '#product__details--info .sold'
  );
  detailsInfoBoxSold.innerHTML =
    new Intl.NumberFormat().format(product.soldCount) + ' sold';

  // Render Info Reviews
  const detailsInfoBoxReviews = container.querySelector(
    '#product__details--info .reviews'
  );
  detailsInfoBoxReviews.textContent =
    product.rating +
    ' (' +
    new Intl.NumberFormat().format(
      (product.soldCount / DIGITS_NUMBER).toFixed(0)
    ) +
    ' reviews)';

  // Render Main
  const detailsMainBox = container.querySelector('#product__details--main');

  // Main -- Description
  const detailsDescriptionText =
    detailsMainBox.querySelector('.description__text');

  detailsDescriptionText.innerHTML = textFormatter(
    product.description,
    100,
    `<span class="hidden more__description">${product.description.slice(
      100
    )}</span> <a id="show__more--description" class="font-bold" href="#"> view more...</a>`
  );

  if (!product.stockStatus) {
    const quantityBox = document.querySelector('#quantity__box');
    const colorBox = document.querySelector('#color__box');
    const sizeBox = document.querySelector('#size__box');
    const priceBox = document.querySelector('#price__box');
    [quantityBox, colorBox, sizeBox, priceBox].forEach(item => {
      item.classList.add('hidden');
    });
    const addToCartBtn = document.querySelector('#add__to--cart');
    addToCartBtn.innerHTML = `
    Out of stock
    `;
    return;
  }

  // Main -- Color
  renderProductColor(product, product.images[0].id);

  // Main -- Size
  renderProductSize(product, product.images[0].color, product.images[0].id);

  // Footer -- Price
  const detailsFooterPrice = container.querySelector(
    '#product__details--footer .price'
  );
  detailsFooterPrice.textContent = numberFormatter(product.price);
};

export default renderProductDetails;
