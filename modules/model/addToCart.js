import getData from './getData.js';
import editData from './editData.js';
import postData from './postData.js';

const addToCart = async product => {
  const cart = await getData('cart');
  const existProducts = cart.find(
    cartItem =>
      cartItem.productId === product.productId &&
      cartItem.color === product.color &&
      cartItem.size === product.size
  );

  if (existProducts) {
    await editData('cart', existProducts.id, {
      count: product.count,
    });
  } else {
    await postData('cart', {
      ...product,
    });
  }
};

export default addToCart;
