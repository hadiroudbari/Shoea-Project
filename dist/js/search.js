import * as DOM from '../../modules/DOM.js';
import renderSearchRecent from '../../modules/view/renderSearchRecent.js';

DOM.searchBoxRecentIcon.addEventListener('click', async () => {});

window.addEventListener('DOMContentLoaded', async () => {
  await renderSearchRecent();
});
