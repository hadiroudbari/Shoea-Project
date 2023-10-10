import * as DOM from '../../modules/DOM.js';
import getData from '../../modules/model/getData.js';
import { textFormatter } from '../../modules/model/formatter.js';

const renderBrands = async () => {
  const brands = await getData('brands');
  brands.sort((a, b) => b.id - a.id);

  DOM.brandsBox.innerHTML = `
          <figure id="brand__show--more" data-brand="More" class="flex flex-col items-center gap-2">
            <div
              style="width:48px !important;height:48px !important";
              class="flex justify-center items-center rounded-full bg-gray-200 cursor-pointer"
            >
              <ion-icon
                class="text-2xl"
                name="ellipsis-horizontal-circle-outline"
              ></ion-icon>
            </div>
            <figcaption class="text-xs font-semibold">More</figcaption>
          </figure>
  `;
  brands.forEach((brand, i) => {
    const html = `
          <figure data-brand="${
            brand.name
          }" class="flex flex-col justify-start items-center gap-2 ${
      i < 4 ? 'more__item hidden' : ''
    }">
            <div
              class="brand__item flex justify-center items-center rounded-full bg-gray-200 cursor-pointer"
            >
              <img
                style="width:48px !important;height:48px !important";
                class="rounded-full p-2"
                src="${brand.img}"
                alt="${brand.name}"
              />
            </div>
            <figcaption class="text-xs font-semibold">${textFormatter(
              brand.name,
              8
            )}</figcaption>
          </figure>
    `;

    DOM.brandsBox.insertAdjacentHTML('afterbegin', html);
  });
};

export default renderBrands;
