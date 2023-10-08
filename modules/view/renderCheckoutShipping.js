import getData from '../model/getData.js';

const renderCheckoutShipping = async (container, id) => {
  let shipping;
  if (id) {
    shipping = await getData('shippingList', 'id', id);
  } else {
    shipping = await getData('shippingList');
  }

  container.innerHTML = '';
  if (id) {
    const html = `
        <article
        data-id="${shipping[0].id}"
        class="p-4 bg-white rounded-xl flex items-center justify-between my-5 shadow  shipping__item"
      >
        <div class="flex gap-3">
          <img
            class="w-10 h-10"
            src="${shipping[0].imgSrc}"
            alt="${shipping[0].name}"
          />
          <div class="flex flex-col gap-2">
            <h4 class="text-xs font-bold flex items-center gap-2">
              ${shipping[0].name}
            </h4>
            <p class="text-[.6rem] text-gray-600">
              Estimated Arrival, Dec 20-22
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div>
            <span id="shipping__price" data-price="${shipping[0].price}" class="text-sm font-bold">$${shipping[0].price}</span>
          </div>
          <img
            class="w-4 h-5 checkout__shipping--selection cursor-pointer"
            src="../assets/content/edit.png"
            alt="edit-icon"
          />
        </div>
      </article>
  `;
    container.insertAdjacentHTML('beforeend', html);

    return;
  }

  shipping.forEach((shipping, i) => {
    const html = `
        <article
        data-id="${shipping.id}"
        class="p-4 bg-white rounded-xl flex items-center justify-between my-5 shadow cursor-pointer shipping__item"
      >
        <div class="flex gap-3">
          <img
            class="w-10 h-10"
            src="${shipping.imgSrc}"
            alt=""
          />
          <div class="flex flex-col gap-2">
            <h4 class="text-xs font-bold flex items-center gap-2">
              ${shipping.name}
            </h4>
            <p class="text-[.6rem] text-gray-600">
              Estimated Arrival, Dec 20-23
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div>
            <span data-price="${shipping.price}" class="text-sm font-bold">$${
      shipping.price
    }</span>
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

export default renderCheckoutShipping;
