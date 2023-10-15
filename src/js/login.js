import * as DOM from '../../modules/DOM.js';
import getData from '../../modules/model/getData.js';
import showToast from '../../modules/model/showToast.js';
import editData from '../../modules/model/editData.js';
import postData from '../../modules/model/postData.js';
import { debounce } from '../../modules/helpers.js';

// INPUT VALIDATION

const changeBtnBackground = () => {
  if (
    DOM.loginInputUsername.value !== '' &&
    DOM.loginInputPassword.value !== ''
  ) {
    DOM.loginFormBtn.removeAttribute('disabled', 'false');
    DOM.loginFormBtn.classList.remove('bg-gray-500');
    DOM.loginFormBtn.classList.add('bg-gray-900');
  } else {
    DOM.loginFormBtn.setAttribute('disabled', 'true');
    DOM.loginFormBtn.classList.remove('bg-gray-900');
    DOM.loginFormBtn.classList.add('bg-gray-500');
  }
};

DOM.loginForm.reset();
changeBtnBackground();

DOM.loginForm.addEventListener('click', e => {
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

DOM.loginInputs.forEach(input =>
  input.addEventListener('focus', e => {
    const parentEl = e.target.closest('.input__box');
    parentEl.classList.add('register__input--focus');
  })
);

DOM.loginInputs.forEach(input =>
  input.addEventListener('blur', e => {
    const parentEl = e.target.closest('.input__box');
    parentEl.classList.remove('register__input--focus');
  })
);

DOM.loginInputs.forEach(input => {
  input.addEventListener('input', e => {
    const parentEl = e.target.closest('.input__box');
    const ionIcons = parentEl.querySelectorAll('ion-icon');

    if (input.value !== '') {
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
});

// LOGIN

DOM.loginForm.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(DOM.loginForm).entries());
  const users = await getData('users');

  const currentUser = users.find(
    user =>
      (user.username === formData.username ||
        user.email === formData.username) &&
      user.password === formData.password
  );

  if (currentUser) {
    await editData('users', currentUser.id, {
      remember: DOM.loginCheckBoxRemember.checked,
    });
    await postData('loggedUser', currentUser);
    showToast(
      'You have successfully logged in',
      1,
      'http://127.0.0.1:5500/src/home.html',
      'linear-gradient(to right, #00b09b, #96c93d)'
    );
  } else {
    showToast(
      'Invalid Username or Password',
      1000,
      '',
      'linear-gradient(to right, #ed213a, #93291e)'
    );
  }
});

const checkRemember = async () => {
  const users = await getData('users');
  const currentUser = users.find(
    user =>
      user.username === DOM.loginInputUsername.value ||
      user.email === DOM.loginInputUsername.value
  );

  if (DOM.loginInputUsername.value === '') {
    DOM.loginFindPassword.classList.remove('flex');
    DOM.loginFindPassword.classList.add('hidden');
  }

  if (!currentUser) {
    DOM.loginInputPassword.value = '';
    const html = `
                <ion-icon name="information-circle"></ion-icon>
                <p id="text" class="text-xs">
                  Username NOT found (for remember password)
                </p>
      `;
    DOM.loginFindPassword.innerHTML = html;
  } else {
    if (currentUser.remember === true) {
      DOM.loginInputPassword.value = currentUser.password;
      const html = `
                <ion-icon name="checkmark"></ion-icon>
                <p id="text" class="text-xs">
                  Your Account has been saved
                </p>
      `;
      DOM.loginFindPassword.innerHTML = html;
      const ionIcons = document.querySelectorAll('ion-icon');
      ionIcons.forEach(icon => {
        icon.classList.remove('text-gray-500');
        icon.classList.add('text-gray-900');
      });
      DOM.loginCheckBoxRemember.checked = true;
      changeBtnBackground();
    } else if (currentUser.remember === false) {
      DOM.loginInputPassword.value = '';
      const html = `
                <ion-icon name="close"></ion-icon>
                <p id="text" class="text-xs">
                  Your Account was NOT saved
                </p>
      `;
      DOM.loginFindPassword.innerHTML = html;
      const ionIcons = document.querySelectorAll('ion-icon');
      ionIcons.forEach(icon => {
        icon.classList.remove('text-gray-900');
        icon.classList.add('text-gray-500');
      });
      changeBtnBackground();
    }
  }
};
const checkUser = debounce(checkRemember, 500);

DOM.loginInputUsername.addEventListener('input', async e => {
  const html = `
      <span class="loader"></span>
      <p id="text" class="text-xs">
        Finding password if your account saved
      </p>
    `;
  DOM.loginFindPassword.innerHTML = html;
  DOM.loginFindPassword.classList.remove('hidden');
  DOM.loginFindPassword.classList.add('flex');
  checkUser();
});
