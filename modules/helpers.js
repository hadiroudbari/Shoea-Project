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
