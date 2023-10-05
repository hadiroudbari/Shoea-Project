import { BASE_API } from '../config.js';

const getData = async dataKey => {
  try {
    const fetchQuery = await fetch(`${BASE_API}/${dataKey}`);
    const dataArray = await fetchQuery.json();

    if (!fetchQuery.ok)
      throw new Error(
        `Message: "${fetchQuery.statusText}" & Status:"${fetchQuery.status}"`
      );

    return dataArray;
  } catch (error) {
    console.error(error);
  }
};

export default getData;
