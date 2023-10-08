import getData from '../model/getData.js';

const renderCheckoutAddress = async (container, id) => {
  const user = await getData('users', 'id', 1);
  const addresses = user[0].addresses;

  container.innerHTML = '';
  if (id) {
    const html = `
        <article
        data-id="${addresses[id - 1].id}"
        class="p-4 bg-white rounded-xl flex items-center justify-between shadow address__item""
      >
        <div class="flex gap-3">
          <img
            class="w-10 h-10"
            src="../assets/content/location.png"
            alt="${addresses[id - 1].name}"
          />
          <div class="flex flex-col gap-2">
            <h4 class="text-xs font-bold">${addresses[id - 1].name}</h4>
            <p class="text-[.6rem] text-gray-600">
            ${addresses[id - 1].address}
            </p>
          </div>
        </div>
        <div>
          <img
            class="w-4 h-5 checkout__address--selection cursor-pointer"
            src="../assets/content/edit.png"
            alt="edit-icon"
          />
        </div>
      </article>
  `;
    container.insertAdjacentHTML('beforeend', html);

    return;
  }

  addresses.forEach((address, i) => {
    const html = `
        <article
        data-id="${address.id}"
        class="p-4 bg-white rounded-xl flex items-center justify-between my-5 shadow cursor-pointer address__item"
      >
        <div class="flex gap-3">
          <img
            class="w-10 h-10"
            src="../assets/content/location.png"
            alt="${address.name}"
          />
          <div class="flex flex-col gap-2">
            <h4 class="text-xs font-bold flex items-center gap-2">
            ${address.name}
              <span
                class="text-[.5rem] font-normal bg-gray-200 px-2 rounded-md"
                >${i === 0 ? 'Default' : ''}</span
              >
            </h4>
            <p class="text-[.6rem] text-gray-600">
            ${address.address}
            </p>
          </div>
        </div>
        <div>
          <ion-icon class="text-xl icon" name="radio-button-${
            i === 0 ? 'on' : 'off'
          }"></ion-icon>
        </div>
      </article>
  `;
    container.insertAdjacentHTML('beforeend', html);
  });
};

export default renderCheckoutAddress;
