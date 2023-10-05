import * as DOM from '../../modules/DOM.js';
import getData from '../../modules/helpers/getData.js';
import showToast from '../../modules/helpers/showToast.js';
import debounce from '../../modules/helpers/debounce.js';
import editData from '../../modules/helpers/editData.js';
import postData from '../../modules/helpers/postData.js';

// INPUT VALIDATION

const changeBtnBackground = () => {
  if (DOM.inputUsername.value !== '' && DOM.inputPassword.value !== '') {
    DOM.formBtn.removeAttribute('disabled', 'false');
    DOM.formBtn.classList.remove('bg-gray-500');
    DOM.formBtn.classList.add('bg-gray-900');
  } else {
    DOM.formBtn.setAttribute('disabled', 'true');
    DOM.formBtn.classList.remove('bg-gray-900');
    DOM.formBtn.classList.add('bg-gray-500');
  }
};

DOM.form.reset();
changeBtnBackground();

DOM.form.addEventListener('click', e => {
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

DOM.inputs.forEach(input =>
  input.addEventListener('focus', e => {
    const parentEl = e.target.closest('.input__box');
    parentEl.classList.add('register__input--focus');
  })
);

DOM.inputs.forEach(input =>
  input.addEventListener('blur', e => {
    const parentEl = e.target.closest('.input__box');
    parentEl.classList.remove('register__input--focus');
  })
);

DOM.inputs.forEach(input => {
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

DOM.form.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(DOM.form).entries());
  const users = await getData('users');

  const currentUser = users.find(
    user =>
      (user.username === formData.username ||
        user.email === formData.username) &&
      user.password === formData.password
  );

  if (currentUser) {
    await editData('users', currentUser.id, {
      remember: DOM.checkBoxRemember.checked,
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
      user.username === DOM.inputUsername.value ||
      user.email === DOM.inputUsername.value
  );

  if (DOM.inputUsername.value === '') {
    DOM.findPassword.classList.remove('flex');
    DOM.findPassword.classList.add('hidden');
  }

  if (!currentUser) {
    DOM.inputPassword.value = '';
    const html = `
                <ion-icon name="information-circle"></ion-icon>
                <p id="text" class="text-xs">
                  Username NOT found (for remember password)
                </p>
      `;
    DOM.findPassword.innerHTML = html;
  } else {
    if (currentUser.remember === true) {
      DOM.inputPassword.value = currentUser.password;
      const html = `
                <ion-icon name="checkmark"></ion-icon>
                <p id="text" class="text-xs">
                  Your Account has been saved
                </p>
      `;
      DOM.findPassword.innerHTML = html;
      const ionIcons = document.querySelectorAll('ion-icon');
      ionIcons.forEach(icon => {
        icon.classList.remove('text-gray-500');
        icon.classList.add('text-gray-900');
      });
      DOM.checkBoxRemember.checked = true;
      changeBtnBackground();
    } else if (currentUser.remember === false) {
      DOM.inputPassword.value = '';
      const html = `
                <ion-icon name="close"></ion-icon>
                <p id="text" class="text-xs">
                  Your Account was NOT saved
                </p>
      `;
      DOM.findPassword.innerHTML = html;
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

DOM.inputUsername.addEventListener('input', async e => {
  const html = `
      <span class="loader"></span>
      <p id="text" class="text-xs">
        Finding password if your account saved
      </p>
    `;
  DOM.findPassword.innerHTML = html;
  DOM.findPassword.classList.remove('hidden');
  DOM.findPassword.classList.add('flex');
  checkUser();
});
