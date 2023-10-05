export const textFormatter = (text, count) => {
  let newLetter = text.split('');
  if (newLetter.length > count) {
    newLetter.splice(count, 2000, '...');
  }

  return newLetter.join('');
};

export const numberFormatter = number => {
  const extractNumber = +number.match(/\d+/)[0];
  const newNumber = `$${extractNumber.toFixed(2, '0')}`;

  return newNumber;
};
