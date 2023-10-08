import { BASE_API } from '../config.js';

const getData = async (
  keyData = 'products',
  key = '',
  value = '',
  customQuery
) => {
  try {
    let fetchQuery;
    if (customQuery) {
      fetchQuery = await fetch(`${BASE_API}/${customQuery}`);
    } else {
      fetchQuery = await fetch(`${BASE_API}/${keyData}?${key}=${value}`);
    }

    const data = await fetchQuery.json();

    if (!fetchQuery.ok)
      throw new Error(
        `Message: "${fetchQuery.statusText}" & Status:"${fetchQuery.status}"`
      );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getData;
