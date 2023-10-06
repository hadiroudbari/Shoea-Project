import { lightOrDark } from '../../modules/helpers.js';

const renderProductColor = (product, id) => {
  const detailsColor = document.querySelector('#product__details--color');

  detailsColor.innerHTML = '';
  product[0].images.forEach((img, i) => {
    const html = `
    <li>
      <a
        data-color="${img.color}"
        data-id="${img.id}"
        style="background:${img.color}"
        class="w-8 h-8 rounded-full flex justify-center items-center product__color"
        href="#"
        >
        ${
          i + 1 === id
            ? `<svg
        xmlns="http://www.w3.org/2000/svg"
        height="20"
        viewBox="0 -960 960 960"
        width="20"
        fill="${lightOrDark(img.color) === 'dark' ? '#fff' : '#000'}"
      >
        <path
          d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
        />
      </svg>`
            : ''
        }
      </a>
    </li>
    `;
    detailsColor.insertAdjacentHTML('beforeend', html);
  });
};

export default renderProductColor;
