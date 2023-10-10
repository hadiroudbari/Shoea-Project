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

const debounceRendering = debounce(renderSearchItem, 500);

DOM.searchBoxRecentIcon.addEventListener('click', async () => {
  if (DOM.searchBoxRecentIcon.classList.contains('opacity-60')) {
    showRecentBox();
    await renderSearchRecent();
  } else {
    showSearchBox();
    debounceRendering(DOM.searchInput.value);
  }
});

DOM.searchInput.addEventListener('input', async () => {
  if (DOM.searchInput.value) {
    DOM.searchFoundBox.innerHTML = '';
    DOM.searchBox.querySelector('svg').style.fill = '#000';
    showSearchBox();
    debounceRendering(DOM.searchInput.value);
  } else {
    DOM.searchBox.querySelector('svg').style.fill = '#6b7280';
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
    DOM.searchInput.value = e.target.closest('.recent__words').textContent;
    DOM.searchFoundBox.innerHTML = '';
    DOM.searchBox.querySelector('svg').style.fill = '#000';
    showSearchBox();
    debounceRendering(DOM.searchInput.value);
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
  DOM.searchInput.value = '';
  DOM.searchBox.classList.add('active__searchbox');
  DOM.keyboardBox.style.transform = 'translateY(0)';
  DOM.searchInput.focus();
  handleLock();
});

// Keyboard

body.addEventListener('click', e => {
  if (
    !e.target.closest('#search__box') &&
    !e.target.closest('#keyboard__box')
  ) {
    DOM.searchBox.classList.remove('active__searchbox');
    DOM.keyboardBox.style.transform = 'translateY(200px)';
  } else {
    DOM.keyboardBox.style.transform = 'translateY(0)';
    DOM.searchBox.classList.add('active__searchbox');
  }
});

const Keyboard = window.SimpleKeyboard.default;

const myKeyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  layout: {
    default: [
      'q w e r t y u i o p',
      'a s d f g h j k l',
      '{lock} z x c v b n m {bksp}',
      '{shift} {space} {enter}',
    ],
    lock: [
      'Q W E R T Y U I O P',
      'A S D F G H J K L',
      '{lock} Z X C V B N M {bksp}',
      '{shift} {space} {enter}',
    ],
    shift: [
      '1 2 3 4 5 6 7 8 9 0',
      '~ / * # $ % ^ & * ( ) - +',
      '_ ; : { } | < > " ! ? {bksp}',
      '{shift} {space} @',
    ],
  },
  display: {
    '{bksp}': '<ion-icon class="text-xl" name="backspace-outline"></ion-icon>',
    '{space}': 'space',
    '{lock}':
      '<img width="25px" height="15px" src="../assets/img/icons/Capslock-4.png" alt="Capslock">',
    '{enter}': 'return',
    '{shift}': '123',
  },
  buttonTheme: [
    {
      class: 'keyboard__bg--gray text-white',
      buttons: '{bksp}',
    },
    {
      class: 'keyboard__bg--gray text-white',
      buttons: '{shift}',
    },
    {
      class: 'space__width',
      buttons: '{space}',
    },
  ],
});

function onChange(input) {
  DOM.searchInput.value = input;
  DOM.searchFoundBox.innerHTML = '';
  DOM.searchBox.querySelector('svg').style.fill = '#000';
  showSearchBox();
  debounceRendering(DOM.searchInput.value);
}

function onKeyPress(button) {
  if (button === '{shift}') handleShift();
  if (button === '{lock}') handleLock();
}

function handleLock() {
  let currentLayout = myKeyboard.options.layoutName;
  let lockToggle = currentLayout === 'default' ? 'lock' : 'default';

  myKeyboard.setOptions({
    layoutName: lockToggle,
  });
}

function handleShift() {
  let currentLayout = myKeyboard.options.layoutName;
  let shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

  myKeyboard.setOptions({
    layoutName: shiftToggle,
  });
}
