import getData from './getData.js';
import editData from './editData.js';

const addToSearch = async id => {
  const userArray = await getData('loggedUser');
  const user = userArray[0];
  const productArray = await getData('products', 'id', id);
  const product = productArray[0];

  const checkRepeatedSearch = user.searchHistory.find(
    item => item.words === product.title
  );

  if (checkRepeatedSearch) return;

  user.searchHistory.push({
    words: product.title,
    id: user.searchHistory[user.searchHistory.length - 1]
      ? user.searchHistory[user.searchHistory.length - 1].id + 1
      : 1,
  });

  await editData('users', user.id, user);
  await editData('loggedUser', user.id, user);
};

export default addToSearch;
