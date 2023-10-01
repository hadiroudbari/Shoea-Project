const form = document.querySelector('#form');
const formBtn = form.querySelector('#login');
const inputs = document.querySelectorAll('.input__box input');
const inputUsername = document.querySelector('#username');
const inputPassword = document.querySelector('#password');
const checkBoxRemember = document.querySelector('#remember');

const changeBtnBackground = () => {
  if (
    inputUsername.value !== '' &&
    inputPassword.value !== '' &&
    checkBoxRemember.checked
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

inputs.forEach(input =>
  input.addEventListener('focus', e => {
    const parentEl = e.target.closest('.input__box');
    parentEl.classList.add('register__input--focus');
  })
);

inputs.forEach(input =>
  input.addEventListener('blur', e => {
    console.log('b');
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
