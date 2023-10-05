import { BASE_API } from '../config.js';

const postData = async (dataKey, json) => {
  try {
    await fetch(`${BASE_API}/${dataKey}`, {
      method: 'POST',
      body: JSON.stringify(json),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default postData;
