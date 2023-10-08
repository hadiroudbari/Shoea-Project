import getData from '../model/getData.js';

const renderCheckoutPayment = async container => {
  const user = await getData('users', 'id', 1);
  const payments = user[0].payments;

  container.innerHTML = '';
  payments.forEach((payment, i) => {
    const html = `
        <article
            data-id="${payment.id}"
            class="p-4 bg-white rounded-xl flex items-center justify-between my-5 shadow cursor-pointer payment__item"
          >
            <div class="flex items-center gap-3">
              <img
                class="w-6 h-6"
                src="${payment.imgSrc}"
                alt="${payment.name}"
              />
              <h4 class="text-sm font-bold flex items-center gap-2">
              ${payment.name}
              </h4>
            </div>
            <div class="flex items-center gap-4">
              <div>
                <span class="text-xs font-bold">${payment.stock}</span>
              </div>
              <ion-icon class="text-xl icon" name="radio-button-${
                i === 0 ? 'on' : 'off'
              }"></ion-icon>
            </div>
          </article>
    `;
    container.insertAdjacentHTML('beforeend', html);
  });
};

export default renderCheckoutPayment;
