export const textFormatter = (text, count, element = '...') => {
  let newLetter = text.split('');
  if (newLetter.length > count) {
    newLetter.splice(count, 2000, element);
  }

  return newLetter.join('');
};

export const numberFormatter = (number, multiple = 1) => {
  const extractNumber = +number.match(/\d+/)[0];
  const newNumber = `$${new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
  }).format(extractNumber * multiple)}`;

  return newNumber;
};
