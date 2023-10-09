import * as DOM from '../../modules/DOM.js';
import renderSearchRecent from '../../modules/view/renderSearchRecent.js';
import renderSearchItem from '../../modules/view/renderSearchItem.js';
import {
  debounce,
  showRecentBox,
  showSearchBox,
} from '../../modules/helpers.js';
import getData from '../../modules/model/getData.js';
import editData from '../../modules/model/editData.js';

const searchInput = document.getElementById('search__input');
const searchBox = document.getElementById('search__box');
const keyboardBox = document.querySelector('#keyboard__box');

const debounceRendering = debounce(renderSearchItem, 500);

DOM.searchBoxRecentIcon.addEventListener('click', async () => {
  if (DOM.searchBoxRecentIcon.classList.contains('opacity-60')) {
    showRecentBox();
    await renderSearchRecent();
  } else {
    showSearchBox();
    debounceRendering(searchInput.value);
  }
});

searchInput.addEventListener('input', async () => {
  if (searchInput.value) {
    DOM.searchFoundBox.innerHTML = '';
    searchBox.querySelector('svg').style.fill = '#000';
    showSearchBox();
    debounceRendering(searchInput.value);
  } else {
    searchBox.querySelector('svg').style.fill = '#6b7280';
    showRecentBox();
  }
});

DOM.searchRecent.addEventListener('click', async e => {
  e.preventDefault();

  if (e.target.closest('.recent__delete--btn')) {
    const user = await getData('loggedUser');
    const userSearchHistory = user[0].searchHistory;

    const newSearchHistory = userSearchHistory.filter(
      item => item.id !== +e.target.closest('.recent__delete--btn').dataset.id
    );

    user[0].searchHistory = newSearchHistory;

    await editData('loggedUser', user[0].id, user[0]);
    await editData('users', user[0].id, user[0]);
    await renderSearchRecent();
  }

  if (e.target.closest('.recent__words')) {
    searchInput.value = e.target.closest('.recent__words').textContent;
    DOM.searchFoundBox.innerHTML = '';
    searchBox.querySelector('svg').style.fill = '#000';
    showSearchBox();
    debounceRendering(searchInput.value);
  }
});

DOM.searchHeaderClear.addEventListener('click', async () => {
  const user = await getData('loggedUser');
  user[0].searchHistory = [];

  await editData('loggedUser', user[0].id, user[0]);
  await editData('users', user[0].id, user[0]);
  await renderSearchRecent();
});

window.addEventListener('DOMContentLoaded', async () => {
  await renderSearchRecent();
  searchInput.value = '';
  searchBox.classList.add('active__searchbox');
  searchInput.focus();
  keyboardBox.style.transform = 'translateY(0)';
});

// Keyboard

body.addEventListener('click', e => {
  if (
    !e.target.closest('#search__box') &&
    !e.target.closest('#keyboard__box')
  ) {
    searchBox.classList.remove('active__searchbox');
    keyboardBox.style.transform = 'translateY(200px)';
  } else {
    keyboardBox.style.transform = 'translateY(0)';
    searchBox.classList.add('active__searchbox');
  }
});

const Keyboard = window.SimpleKeyboard.default;

const myKeyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  layout: {
    default: [
      'Q W E R T Y U I O P',
      'A S D F G H J K L',
      '{shift} Z X C V B N M {bksp}',
      '@ {space} {enter}',
    ],
    shift: [
      '1 2 3 4 5 6 7 8 9 0',
      '~ ! @ # $ % ^ & * ( ) _ +',
      '{shift} : { } | < > ? " {bksp}',
      '.com {space} @',
    ],
  },
  display: {
    '{bksp}': '<ion-icon class="text-xl" name="backspace-outline"></ion-icon>',
    '{space}': 'space',
    '{shift}': 'shift',
    '{enter}': 'return',
  },
  buttonTheme: [
    {
      class: 'keyboard__bg--gray text-white',
      buttons: '{bksp}',
    },
  ],
});

function onChange(input) {
  searchInput.value = input;
  DOM.searchFoundBox.innerHTML = '';
  searchBox.querySelector('svg').style.fill = '#000';
  showSearchBox();
  debounceRendering(searchInput.value);
}

function onKeyPress(button) {
  if (button === '{shift}' || button === '{lock}') handleShift();
}

function handleShift() {
  let currentLayout = myKeyboard.options.layoutName;
  let shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

  myKeyboard.setOptions({
    layoutName: shiftToggle,
  });
}
