const form = document.querySelector('#form');
const formBtn = form.querySelector('#submit');
const inputs = document.querySelectorAll('.input__box input');
const inputUsername = document.querySelector('#username');
const inputFirstname = document.querySelector('#firstname');
const inputLastname = document.querySelector('#lastname');
const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password');
const inputPasswordRepeat = document.querySelector('#password__second');
const checkBoxRemember = document.querySelector('#remember');
const registerWarningPass = document.querySelector(
  '.warning__register--password'
);

let arrValidation = [],
  passValidation;

inputPassword.addEventListener('copy', e => {
  e.preventDefault();
});
inputPasswordRepeat.addEventListener('copy', e => {
  e.preventDefault();
});

const changeBtnBackground = () => {
  if (
    inputUsername.value !== '' &&
    inputFirstname.value !== '' &&
    inputLastname.value !== '' &&
    inputEmail.value !== '' &&
    inputPassword.value !== '' &&
    inputPasswordRepeat.value !== '' &&
    checkBoxRemember.checked &&
    passValidation &&
    inputPassword.value === inputPasswordRepeat.value
  ) {
    formBtn.removeAttribute('disabled', 'false');
    formBtn.classList.remove('bg-gray-500');
    formBtn.classList.add('bg-gray-900');
  } else {
    formBtn.setAttribute('disabled', 'true');
    formBtn.classList.remove('bg-gray-900');
    formBtn.classList.add('bg-gray-500');
  }
};

form.reset();
changeBtnBackground();

checkBoxRemember.addEventListener('change', () => {
  changeBtnBackground();
});

form.addEventListener('click', e => {
  const currentInput = e.target.closest('.input__box').querySelector('input');

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

inputs.forEach(input =>
  input.addEventListener('focus', e => {
    const parentEl = e.target.closest('.input__box');
    parentEl.classList.add('register__input--focus');
  })
);

inputs.forEach(input =>
  input.addEventListener('blur', e => {
    const parentEl = e.target.closest('.input__box');
    parentEl.classList.remove('register__input--focus');
  })
);

inputs.forEach(input => {
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
  if (inputPassword.value.match(lowerCaseLetters)) {
    document.querySelector('#letter').classList.add('valid');
    arrValidation.push('1');
  } else {
    document.querySelector('#letter').classList.remove('valid');
  }
  if (inputPassword.value.match(upperCaseLetters)) {
    document.querySelector('#capital').classList.add('valid');
    arrValidation.push('2');
  } else {
    document.querySelector('#capital').classList.remove('valid');
  }
  if (inputPassword.value.match(numbers)) {
    document.querySelector('#number').classList.add('valid');
    arrValidation.push('3');
  } else {
    document.querySelector('#number').classList.remove('valid');
  }
  if (inputPassword.value.length >= 8) {
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
    registerWarningPass.classList.add('Done');
    registerWarningPass.classList.remove('Wrong');
  } else {
    registerWarningPass.classList.add('Wrong');
  }
};

inputPassword.addEventListener('keyup', passwordValidation);

inputPassword.addEventListener('focus', () => {
  registerWarningPass.style.display = 'table';
  registerWarningPass.innerHTML = `
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

inputPassword.addEventListener('blur', () => {
  registerWarningPass.style.display = 'none';
  registerWarningPass.innerHTML = '';
});
