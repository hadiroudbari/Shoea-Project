import { BASE_API } from '../config.js';

const editData = async (dataKey, id, json) => {
  try {
    await fetch(`${BASE_API}/${dataKey}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(json),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default editData;
