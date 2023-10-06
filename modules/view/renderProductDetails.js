import { textFormatter, numberFormatter } from '../model/formatter.js';
import renderProductSize from './renderProductSize.js';
import renderProductColor from './renderProductColor.js';
import renderProductImage from './renderProductImage.js';

const renderProductDetails = async (container, product) => {
  // Fix Background Image for UI
  const containerHeader = container.querySelector('header');
  if (product[0].brand === 'nike') {
    containerHeader.classList.add('bg-gray-100');
  } else if (product[0].brand === 'adidas') {
    containerHeader.classList.add('bg-details_img');
  } else {
    containerHeader.classList.add('bg-gray-100');
  }

  // Render Image
  renderProductImage(product, product[0].images[0].id);

  // Render Title
  const detailsTitleBox = container.querySelector(
    '#product__details--title h2'
  );
  detailsTitleBox.textContent = product[0].title;

  // Render Info Sold
  const detailsInfoBoxSold = container.querySelector(
    '#product__details--info .sold'
  );
  detailsInfoBoxSold.innerHTML =
    new Intl.NumberFormat().format(product[0].soldCount) + ' sold';

  // Render Info Reviews
  const detailsInfoBoxReviews = container.querySelector(
    '#product__details--info .reviews'
  );
  detailsInfoBoxReviews.textContent =
    product[0].rating +
    ' (' +
    new Intl.NumberFormat().format(product[0].soldCount / 2) +
    ' reviews)';

  // Render Main
  const detailsMainBox = container.querySelector('#product__details--main');

  // Main -- Description
  const detailsDescriptionText =
    detailsMainBox.querySelector('.description__text');

  detailsDescriptionText.innerHTML = textFormatter(
    product[0].description,
    100,
    `<span class="hidden more__description">${product[0].description.slice(
      100
    )}</span> <a id="show__more--description" class="font-bold" href="#"> view more...</a>`
  );

  // Main -- Color
  renderProductColor(product, product[0].images[0].id);

  // Main -- Size
  renderProductSize(
    product,
    product[0].images[0].color,
    product[0].images[0].id
  );

  // Footer -- Price
  const detailsFooterPrice = container.querySelector(
    '#product__details--footer .price'
  );
  detailsFooterPrice.textContent = numberFormatter(product[0].price);
};

export default renderProductDetails;
