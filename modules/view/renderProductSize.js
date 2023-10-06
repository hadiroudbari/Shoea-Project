export const selectProductSizeOption = (product, sizeItem, id, sizeID) => {
  const stockAlert = document.querySelector('#stock__alert');
  const currentSizeStock = product.sizeStock.find(item => item.id === id);
  const sizeStockCount = currentSizeStock.stock[sizeID - 1].stockCount;
  const sizeStockItems = document.querySelectorAll('.product__size');

  sizeStockItems.forEach(item => {
    item.classList.remove('bg-black', 'text-white', 'active__size');
  });

  sizeItem.classList.add('bg-black', 'text-white', 'active__size');

  stockAlert.classList.remove('hidden');
  stockAlert.textContent = '';
  stockAlert.classList.remove('text-black');
  stockAlert.classList.remove('text-red-500');
  stockAlert.classList.add('text-orange-500');

  stockAlert.dataset.count = sizeStockCount;
  if (sizeStockCount <= 5) {
    stockAlert.textContent = `Just a few left. Order NOW !!`;
  } else if (sizeStockCount > 5 && sizeStockCount < 30) {
    stockAlert.textContent = `Just ${sizeStockCount} left. Order Soon !`;
  } else if (sizeStockCount >= 30) {
    stockAlert.classList.remove('text-orange-500');
    stockAlert.classList.add('text-black');
    stockAlert.textContent = `${sizeStockCount} Pieces are Available. Order anytime you want.`;
  }
};

const renderProductSize = (product, color, id) => {
  const detailsSize = document.querySelector('#product__details--size');
  const stockAlert = document.querySelector('#stock__alert');
  stockAlert.classList.add('hidden');

  const currentColorSize = product.sizeStock.find(item => item.color === color);

  detailsSize.innerHTML = '';
  currentColorSize.stock.forEach((item, i) => {
    const html = `
                <li>
                  <a
                    data-id="${id}"
                    data-size="${i + 1}"
                    class="w-8 h-8 flex justify-center items-center border-2 border-black rounded-full font-bold product__size ${
                      item.stockCount === 0 ? 'disabled__size' : ''
                    }"
                    href="#"
                    >${item.size}</a
                  >
                </li>
    `;
    detailsSize.insertAdjacentHTML('beforeend', html);
  });
};

export default renderProductSize;
