import { BASE_API } from '../config.js';

const deleteData = async (dataKey, id) => {
  try {
    await fetch(`${BASE_API}/${dataKey}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default deleteData;
