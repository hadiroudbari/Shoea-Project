import * as DOM from '../../modules/DOM.js';
import getData from '../../modules/model/getData.js';

const renderSearchRecent = async () => {
  const userArray = await getData('loggedUser');
  const userSearchHistory = userArray[0].searchHistory;

  DOM.searchRecentList.innerHTML = '';
  userSearchHistory.forEach(search => {
    const html = `
              <li class="flex justify-between items-center text-gray-500" ">
                <a class="recent__words" href="#">${search.words}</a>
                <button data-id="${search.id}" class="recent__delete--btn">
                  <svg
                    fill="#6b7280"
                    class="w-6 h-6 mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 32 40"
                    enable-background="new 0 0 32 32"
                  >
                    <path
                      d="M23,2H9C5.1401367,2,2,5.1401367,2,9v14c0,3.8598633,3.1401367,7,7,7h14c3.8598633,0,7-3.1401367,7-7V9  C30,5.1401367,26.8598633,2,23,2z M28,23c0,2.7568359-2.2431641,5-5,5H9c-2.7568359,0-5-2.2431641-5-5V9  c0-2.7568359,2.2431641-5,5-5h14c2.7568359,0,5,2.2431641,5,5V23z M20.949707,12.4643555L17.4140625,16l3.5356445,3.5356445  c0.390625,0.390625,0.390625,1.0234375,0,1.4140625c-0.1953125,0.1953125-0.4511719,0.2929688-0.7070313,0.2929688  s-0.5117188-0.0976563-0.7070313-0.2929688L16,17.4140625l-3.5356445,3.5356445  c-0.1953125,0.1953125-0.4511719,0.2929688-0.7070313,0.2929688s-0.5117188-0.0976563-0.7070313-0.2929688  c-0.390625-0.390625-0.390625-1.0234375,0-1.4140625L14.5859375,16l-3.5356445-3.5356445  c-0.390625-0.390625-0.390625-1.0234375,0-1.4140625s1.0234375-0.390625,1.4140625,0L16,14.5859375l3.5356445-3.5356445  c0.390625-0.390625,1.0234375-0.390625,1.4140625,0S21.340332,12.0737305,20.949707,12.4643555z"
                    />
                  </svg>
                </button>
              </li>
    `;

    DOM.searchRecentList.insertAdjacentHTML('beforeend', html);
  });
};

export default renderSearchRecent;
