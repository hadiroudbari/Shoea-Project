import * as DOM from '../../modules/DOM.js';
import getData from '../../modules/model/getData.js';
import showToast from '../../modules/model/showToast.js';
import editData from '../../modules/model/editData.js';
import postData from '../../modules/model/postData.js';

// INPUT VALIDATION

let arrValidation = [],
  passValidation;

DOM.registerInputPassword.addEventListener('copy', e => {
  e.preventDefault();
});
DOM.registerInputPasswordRepeat.addEventListener('copy', e => {
  e.preventDefault();
});

const changeBtnBackground = () => {
  if (
    DOM.registerInputUsername.value !== '' &&
    DOM.registerInputFirstname.value !== '' &&
    DOM.registerInputLastname.value !== '' &&
    DOM.registerInputEmail.value !== '' &&
    DOM.registerInputPassword.value !== '' &&
    DOM.registerInputPasswordRepeat.value !== '' &&
    DOM.registerCheckBoxRemember.checked &&
    passValidation &&
    DOM.registerInputPassword.value === DOM.registerInputPasswordRepeat.value
  ) {
    DOM.registerFormBtn.removeAttribute('disabled', 'false');
    DOM.registerFormBtn.classList.remove('bg-gray-500');
    DOM.registerFormBtn.classList.add('bg-gray-900');
  } else {
    DOM.registerFormBtn.setAttribute('disabled', 'true');
    DOM.registerFormBtn.classList.remove('bg-gray-900');
    DOM.registerFormBtn.classList.add('bg-gray-500');
  }
};

DOM.registerForm.reset();
changeBtnBackground();

DOM.registerCheckBoxRemember.addEventListener('change', () => {
  changeBtnBackground();
});

DOM.registerForm.addEventListener('click', e => {
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

DOM.registerInputs.forEach(input =>
  input.addEventListener('focus', e => {
    const parentEl = e.target.closest('.input__box');
    parentEl.classList.add('register__input--focus');
  })
);

DOM.registerInputs.forEach(input =>
  input.addEventListener('blur', e => {
    const parentEl = e.target.closest('.input__box');
    parentEl.classList.remove('register__input--focus');
  })
);

DOM.registerInputs.forEach(input => {
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

// PASSWORD VALIDATION

const passwordValidation = () => {
  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;
  if (DOM.registerInputPassword.value.match(lowerCaseLetters)) {
    document.querySelector('#letter').classList.add('valid');
    arrValidation.push('1');
  } else {
    document.querySelector('#letter').classList.remove('valid');
  }
  if (DOM.registerInputPassword.value.match(upperCaseLetters)) {
    document.querySelector('#capital').classList.add('valid');
    arrValidation.push('2');
  } else {
    document.querySelector('#capital').classList.remove('valid');
  }
  if (DOM.registerInputPassword.value.match(numbers)) {
    document.querySelector('#number').classList.add('valid');
    arrValidation.push('3');
  } else {
    document.querySelector('#number').classList.remove('valid');
  }
  if (DOM.registerInputPassword.value.length >= 8) {
    document.querySelector('#length').classList.add('valid');
    arrValidation.push('4');
  } else {
    document.querySelector('#length').classList.remove('valid');
  }

  if ([...new Set(arrValidation)].length == 4) {
    passValidation = true;
    arrValidation = [];
  } else {
    passValidation = false;
  }

  if (passValidation) {
    DOM.registerWarningPass.classList.add('Done');
    DOM.registerWarningPass.classList.remove('Wrong');
  } else {
    DOM.registerWarningPass.classList.add('Wrong');
  }
};

DOM.registerInputPassword.addEventListener('keyup', passwordValidation);

DOM.registerInputPassword.addEventListener('focus', () => {
  DOM.registerWarningPass.style.display = 'table';
  DOM.registerWarningPass.innerHTML = `
  <div id="message">
    <h3>Password must contain :</h3>
    <p id="letter" class="invalid">A <b>lowercase</b> letter</p>
    <p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>
    <p id="number" class="invalid">A <b>number</b></p>
    <p id="length" class="invalid">Minimum <b>8 characters</b></p>
  </div>`;
  if (passValidation) {
    document
      .querySelectorAll('.invalid')
      .forEach(p => p.classList.add('valid'));
  }
  passwordValidation();
});

DOM.registerInputPassword.addEventListener('blur', () => {
  DOM.registerWarningPass.style.display = 'none';
  DOM.registerWarningPass.innerHTML = '';
});

// REGISTER

DOM.registerForm.addEventListener('submit', e => {
  e.preventDefault();
});
