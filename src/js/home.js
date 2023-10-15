import * as DOM from '../../modules/DOM.js';
import getData from '../../modules/model/getData.js';
import renderProducts from '../../modules/view/renderProducts.js';
import renderFilters from '../../modules/view/renderFilters.js';
import renderBrands from '../../modules/view/renderBrands.js';
import deleteData from '../../modules/model/deleteData.js';

const showUserInfo = async () => {
  const currnetUser = await getData('loggedUser');

  if (currnetUser.length < 1) {
    location.assign('http://127.0.0.1:5500/src/login.html');
  }

  DOM.userImage.src = currnetUser[0].userImage;
  DOM.userFullname.textContent = `${currnetUser[0].firstName} ${currnetUser[0].lastName}`;
};

DOM.inputSearch.addEventListener('focus', () => {
  location.assign('http://127.0.0.1:5500/src/search.html');
});

DOM.brandsBox.addEventListener('click', e => {
  const figure = e.target.closest('figure');
  const brandName = figure.dataset.brand;
  const moreItems = DOM.brandsBox.querySelectorAll('.more__item');
  const figCaption = figure.querySelector('figcaption');

  if (e.target.closest('div').classList.contains('brand__item')) {
    location.assign(
      `http://127.0.0.1:5500/src/home-brand.html?brand=${brandName.toLowerCase()}`
    );
  } else if (figure.id === 'brand__show--more') {
    moreItems.forEach(item => {
      item.classList.remove('hidden');
    });
    figCaption.textContent = 'Less';
    figure.id = 'brand__show--less';
  } else if (figure.id === 'brand__show--less') {
    moreItems.forEach(item => {
      item.classList.add('hidden');
    });
    figCaption.textContent = 'More';
    figure.id = 'brand__show--more';
  }
});

DOM.filterBox.addEventListener('click', async e => {
  e.preventDefault();
  const filterName = e.target.closest('li').dataset.filter.toLowerCase();
  const filterLinks = document.querySelectorAll('.filter__link');
  filterLinks.forEach(filter => {
    filter.classList.remove('bg-tag', 'text-white');
    filter.classList.add('text-black');
  });

  if (e.target.classList.contains('filter__link')) {
    e.target.classList.add('bg-tag', 'text-white');

    if (filterName !== 'all') {
      const products = await getData('products', 'brand', filterName);
      await renderProducts(DOM.homeProducts, products);
    } else {
      await renderProducts(DOM.homeProducts);
    }
  }
});

DOM.exitUser.addEventListener('click', async e => {
  e.preventDefault();
  const currnetUser = await getData('loggedUser');

  await deleteData('loggedUser', currnetUser[0].id);
  location.assign('http://127.0.0.1:5500/src/login.html');
});

const init = async () => {
  await showUserInfo();
  await renderBrands();
  await renderFilters();
  await renderProducts(DOM.homeProducts);
};

window.addEventListener('DOMContentLoaded', init);
