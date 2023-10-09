import * as DOM from '../../modules/DOM.js';
import { numberExtractor, numberFormatter } from './model/formatter.js';

// Debounce
export const debounce = (cb, delay = 1000) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args), delay);
  };
};

// Get Product ID
export const getProductID = () => {
  const url = new URL(window.location.href);
  const ProductID = url.searchParams.get('id');

  return ProductID;
};

export const lightOrDark = color => {
  // Check the format of the color, HEX or RGB?
  let r, g, b;
  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP equation from http://alienryderflex.com/hsp.html
  let hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {
    return 'light';
  } else {
    return 'dark';
  }
};

export const checkProductDetails = () => {
  const sizes = Array.from(document.querySelectorAll('.product__size'));
  const colors = Array.from(document.querySelectorAll('.product__color'));

  const currentSize = sizes.find(size =>
    size.classList.contains('active__size')
  );
  const currentColor = colors.find(color =>
    color.classList.contains('active__color')
  );

  if (currentSize && currentColor) {
    DOM.addToCartBtn.disabled = false;
    DOM.addToCartBtn.style.opacity = '100%';
  } else {
    DOM.addToCartBtn.disabled = true;
    DOM.addToCartBtn.style.opacity = '50%';
  }

  return {
    size: +currentSize?.textContent,
    color: currentColor?.dataset.color,
    colorName: currentColor.dataset.name ? currentColor.dataset.name : null,
  };
};

export const changeProductBg = (container, brand) => {
  if (brand === 'nike') {
    container.classList.add('bg-gray-100');
  } else if (brand === 'adidas') {
    container.classList.add('bg-details_img');
  } else {
    container.classList.add('bg-gray-100');
  }
};

export const calcTotalPrice = (container, totalBox, shipping, discount) => {
  const productCartPrice = container.querySelectorAll('.cart__price');

  let totalPrice = 0;
  productCartPrice.forEach(element => {
    const extractArray = element.innerHTML.match(/\d+/g);
    extractArray.splice(-1, 1);
    const extractString = extractArray.join('');
    totalPrice += +extractString;
  });
  if (shipping) totalPrice += +shipping;

  if (discount) totalPrice -= +discount;

  if (totalBox) totalBox.innerHTML = numberFormatter(totalPrice);

  return totalPrice;
};

export const showDeleteModal = () => {
  DOM.overlay.classList.remove('hidden');
  DOM.modal.classList.remove('hide__modal');
  DOM.modal.classList.add('shode__modal');
  DOM.overlay.style.height = body.scrollHeight + 'px';
};

export const hideDeleteModal = () => {
  DOM.overlay.classList.add('hidden');
  DOM.modal.classList.add('hide__modal');
  DOM.modal.classList.remove('shode__modal');
};
