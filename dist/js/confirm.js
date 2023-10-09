import * as DOM from '../../modules/DOM.js';
import getData from '../../modules/model/getData.js';
import editData from '../../modules/model/editData.js';
import deleteData from '../../modules/model/deleteData.js';
import postData from '../../modules/model/postData.js';
import {
  numberExtractor,
  numberFormatter,
} from '../../modules/model/formatter.js';

const urlCheck = () => {
  // URL INFORMATION
  const url = new URL(window.location.href);
  const queryAddressID = url.searchParams.get('addressID');
  const queryShippingID = url.searchParams.get('shippingID');
  const queryPaymentID = url.searchParams.get('paymentID');
  const queryDiscount = url.searchParams.get('discount');
  const queryTotalPrice = url.searchParams.get('totalPrice');

  if (
    !queryAddressID ||
    !queryShippingID ||
    !queryPaymentID ||
    !queryDiscount ||
    !queryTotalPrice
  ) {
    location.assign('http://127.0.0.1:5500/src/cart.html');
  } else {
    return {
      address: queryAddressID,
      shipping: queryShippingID,
      payment: queryPaymentID,
      discount: queryDiscount,
      totalPrice: queryTotalPrice,
    };
  }
};

DOM.confirmForm.addEventListener('submit', async e => {
  e.preventDefault();
  const userArray = await getData('loggedUser');
  const user = userArray[0];

  if (DOM.confirmInputPassword.value === user.password) {
    const userCart = await getData('', '', '', `users/${user.id}/cart`);
    const products = await getData('products');
    const shippingList = await getData('shippingList');

    DOM.wrongPassword.classList.add('hidden');

    if (userCart.length < 1) {
      location.assign('http://127.0.0.1:5500/src/cart.html');
      return;
    }

    const userCardStock = numberExtractor(
      user.payments[+urlCheck().payment - 1].stock
        .split('')
        .filter(item => item !== ',')
        .join('')
    );
    const totalPrice = numberExtractor(urlCheck().totalPrice);

    if (userCardStock > totalPrice) {
      const newUserStock = numberFormatter(userCardStock - totalPrice);
      const newUserStockArray = newUserStock.split('');
      for (let i = 1; i < 4; i++) {
        newUserStockArray.splice(-1, i);
      }
      const newUserStockStr = newUserStockArray.join('');
      user.payments[+urlCheck().payment - 1].stock = newUserStockStr;

      await editData('users', user.id, user);
      await editData('loggedUser', user.id, user);
    } else {
      DOM.confirmOverlay.classList.remove('hidden');
      DOM.finishModalUnsuccess.classList.remove('hidden');
      DOM.finishModalUnsuccess.classList.add('flex');

      return;
    }

    const newOrder = {
      cart: userCart,
      userId: user.id,
      address: user.addresses[+urlCheck().address - 1].name,
      shipping: shippingList[+urlCheck().shipping - 1].name,
      payment: user.payments[+urlCheck().payment - 1].name,
      totalPrice: urlCheck().totalPrice,
      discount: urlCheck().discount,
      status: 'In Delivery',
      active: true,
    };

    await postData('orders', newOrder);

    userCart.forEach(async cart => {
      const selectedProduct = products.find(
        product => product.id === cart.productId
      );
      const selectedColor = selectedProduct.sizeStock.find(
        stock => stock.color === cart.color
      );
      const selectedSize = selectedColor.stock.find(
        item => item.size === cart.size
      );
      selectedSize.stockCount -= cart.count;

      await editData('products', selectedProduct.id, selectedProduct);
      await deleteData('cart', cart.id);
    });

    DOM.confirmOverlay.classList.remove('hidden');
    DOM.finishModalSuccess.classList.remove('hidden');
    DOM.finishModalSuccess.classList.add('flex');
    DOM.confirmForm.reset();
  } else {
    DOM.wrongPassword.classList.remove('hidden');
    DOM.wrongPassword.classList.add('flex');
  }
});

window.addEventListener('DOMContentLoaded', urlCheck);

// UI CODES

const changeBtnBackground = () => {
  if (DOM.confirmInputPassword.value !== '') {
    DOM.confirmFormBtn.removeAttribute('disabled', 'false');
    DOM.confirmFormBtn.classList.remove('bg-gray-500');
    DOM.confirmFormBtn.classList.add('bg-gray-900');
  } else {
    DOM.confirmFormBtn.setAttribute('disabled', 'true');
    DOM.confirmFormBtn.classList.remove('bg-gray-900');
    DOM.confirmFormBtn.classList.add('bg-gray-500');
  }
};

DOM.confirmForm.reset();
changeBtnBackground();

DOM.confirmForm.addEventListener('click', e => {
  const currentInput = e.target.closest('.input__box')?.querySelector('input');

  if (e.target.classList.contains('show')) {
    currentInput.type = 'text';
    e.target.classList.remove('show');
    e.target.classList.add('hide');
    e.target.name = 'eye-off';
  } else if (e.target.classList.contains('hide')) {
    currentInput.type = 'password';
    e.target.classList.add('show');
    e.target.classList.remove('hide');
    e.target.name = 'eye';
  }
});

DOM.confirmInputPassword.addEventListener('focus', e => {
  const parentEl = e.target.closest('.input__box');
  parentEl.classList.add('register__input--focus');
});
DOM.confirmInputPassword.addEventListener('blur', e => {
  const parentEl = e.target.closest('.input__box');
  parentEl.classList.remove('register__input--focus');
});

DOM.confirmInputPassword.addEventListener('input', e => {
  const parentEl = e.target.closest('.input__box');
  const ionIcons = parentEl.querySelectorAll('ion-icon');

  if (DOM.confirmInputPassword.value !== '') {
    ionIcons.forEach(icon => {
      icon.classList.remove('text-gray-500');
      icon.classList.add('text-gray-900');
    });
  } else {
    ionIcons.forEach(icon => {
      icon.classList.remove('text-gray-900');
      icon.classList.add('text-gray-500');
    });
  }

  changeBtnBackground();
});
