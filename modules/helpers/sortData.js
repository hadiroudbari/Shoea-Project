import getData from './getData.js';

const sortData = async products => {
  if (!products) products = await getData();
  products.sort((a, b) => +b.soldCount - +a.soldCount);

  return products;
};

export default sortData;
