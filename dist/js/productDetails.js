import * as DOM from '../../modules/DOM.js';
import { getProductID } from '../../modules/helpers.js';
import getData from '../../modules/model/getData.js';
import renderProductDetails from '../../modules/view/renderProductDetails.js';
import renderProductSize from '../../modules/view/renderProductSize.js';
import renderProductColor from '../../modules/view/renderProductColor.js';
import renderProductImage from '../../modules/view/renderProductImage.js';
import { selectProductSizeOption } from '../../modules/view/renderProductSize.js';
import { numberFormatter } from '../../modules/model/formatter.js';
import addToCart from '../../modules/model/addToCart.js';
import { checkProductDetails } from '../../modules/helpers.js';

const productID = getProductID();
let product;

const showProductDetails = async () => {
  product = await getData('products', 'id', productID);
  renderProductDetails(DOM.detailsContainer, product);
};

swiper.on('slideChange', function () {
  renderProductColor(product, swiper.activeIndex + 1);
  renderProductSize(
    product,
    product[0].images[swiper.activeIndex].color,
    +(swiper.activeIndex + 1)
  );
});

DOM.detailsMainBox.addEventListener('click', e => {
  e.preventDefault();

  // Description
  if (e.target.id === 'show__more--description') {
    const parentEl = e.target.closest('.description__text');
    const moreDescription = parentEl.querySelector('.more__description');

    if (moreDescription.classList.contains('hidden')) {
      moreDescription.classList.remove('hidden');
      moreDescription.classList.add('inline');
      e.target.textContent = ' view less...';
    } else {
      moreDescription.classList.remove('inline');
      moreDescription.classList.add('hidden');
      e.target.textContent = ' view more...';
    }
  }

  // Color & Size
  if (e.target.classList.contains('product__color')) {
    renderProductSize(product, e.target.dataset.color, +e.target.dataset.id);
    renderProductColor(product, +e.target.dataset.id);
    renderProductImage(product, +e.target.dataset.id);
    DOM.productOrderCount.textContent = 1;
    DOM.productDetailsPrice.textContent = numberFormatter(product[0].price);
    checkProductDetails();
  }

  if (e.target.classList.contains('product__size')) {
    selectProductSizeOption(
      product,
      e.target,
      +e.target.dataset.id,
      +e.target.dataset.size
    );
    DOM.productOrderCount.textContent = 1;
    DOM.productDetailsPrice.textContent = numberFormatter(product[0].price);
    checkProductDetails();
  }

  if (
    e.target.id === 'product__order--plus' ||
    e.target.id === 'product__order--minus'
  ) {
    const stockAlert = document.querySelector('#stock__alert');

    if (!stockAlert.dataset.count) {
      stockAlert.classList.remove('hidden');
      stockAlert.classList.remove('text-black');
      stockAlert.classList.remove('text-orange-500');
      stockAlert.classList.add('text-red-500');

      stockAlert.textContent = 'First, You should choose a size';
    } else if (stockAlert.dataset.count > 0) {
      if (e.target.id === 'product__order--plus') {
        if (+DOM.productOrderCount.textContent === +stockAlert.dataset.count)
          return;
        DOM.productOrderCount.textContent =
          +DOM.productOrderCount.textContent + 1;
      } else if (e.target.id === 'product__order--minus') {
        if (+DOM.productOrderCount.textContent === 1) return;
        DOM.productOrderCount.textContent =
          +DOM.productOrderCount.textContent - 1;
      }
    }

    DOM.productDetailsPrice.textContent = numberFormatter(
      product[0].price,
      DOM.productOrderCount.textContent
    );
  }
});

DOM.addToCartBtn.addEventListener('click', async e => {
  e.preventDefault();

  const newProduct = {
    title: product[0].title,
    imgSrc: product[0].images[swiper.activeIndex].imgSrc,
    size: checkProductDetails().size,
    color: checkProductDetails().color,
    count: +DOM.productOrderCount.textContent,
    price: product[0].price,
    productId: product[0].id,
    userId: 1,
  };

  await addToCart(newProduct);
});

const init = async () => {
  await showProductDetails();
  checkProductDetails();
};
window.addEventListener('DOMContentLoaded', init);
