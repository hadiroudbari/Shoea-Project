const renderProductImage = (product, id = 1) => {
  const imageSliderBox = document.querySelector('#product__details--slider');

  imageSliderBox.innerHTML = '';
  product.images.forEach(img => {
    const html = `
            <div data-id="${img.id}" class="swiper-slide h-full">
              <img
                src="${img.imgSrc}"
                alt="${product.title}"
              />
            </div>
    `;
    imageSliderBox.insertAdjacentHTML('beforeend', html);
  });

  swiper.slideTo(id - 1);
};

export default renderProductImage;
