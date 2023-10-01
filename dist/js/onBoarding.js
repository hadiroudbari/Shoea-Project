const nextBtn = document.querySelector('#btn__next');
const onboardingFirst = document.querySelector('#onboarding__first');
const onboardingSecond = document.querySelector('#onboarding__second');
const onboardingThird = document.querySelector('#onboarding__third');
const indicatorFirst = document.querySelector('#indicator__first');
const indicatorSecond = document.querySelector('#indicator__second');
const indicatorThird = document.querySelector('#indicator__third');

let index = 0;
nextBtn.addEventListener('click', e => {
  if (index === 0) {
    onboardingFirst.style.transform = 'translateX(-100%)';
    onboardingSecond.style.transform = `translateX(0)`;
    onboardingThird.style.transform = 'translateX(100%)';
    indicatorFirst.classList.remove('bg-gray-800');
    indicatorFirst.classList.add('bg-gray-400');
    indicatorSecond.classList.add('bg-gray-800');
  }
  if (index === 1) {
    onboardingFirst.style.transform = 'translateX(-200%)';
    onboardingSecond.style.transform = `translateX(-100%)`;
    onboardingThird.style.transform = 'translateX(0)';
    indicatorSecond.classList.remove('bg-gray-800');
    indicatorThird.classList.add('bg-gray-800');
    nextBtn.textContent = 'Get Started';
  }
  index++;
});
