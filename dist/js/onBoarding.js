const lastSlide = document.querySelector('#last__slide');
const nextBtn = document.querySelector('#btn__next');
const nextStart = document.querySelector('#btn__start');
const swiper = new Swiper('.mySwiper', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
nextBtn.addEventListener('click', e => swiper.slideNext());
swiper.on('slideChange', function () {
  nextBtn.classList.add('table');
  nextBtn.classList.remove('hidden');
  nextStart.classList.add('hidden');
  nextStart.classList.remove('table');
  if (lastSlide.classList.contains('swiper-slide-next')) {
    nextBtn.classList.remove('table');
    nextBtn.classList.add('hidden');
    nextStart.classList.remove('hidden');
    nextStart.classList.add('table');
  }
});
