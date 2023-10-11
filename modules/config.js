// LINKS
export const BASE_URL = 'http://127.0.0.1:5500/src';
export const BASE_API = 'http://localhost:3000';

// SPECIAL VARIABLES
export const SPLICE_COUNT = 2000;
export const DIGITS_NUMBER = 2;
export const TO_SECOND = 1000;
export const BASE_COUNT = 1;
export const SEARCH_DEBOUNCE_TIME = 500;

// DATE FORMAT
const date = new Date();
let options = {
  month: 'long',
  day: 'numeric',
};
export const DATE_STRING = new Intl.DateTimeFormat('en-US', options).format(
  date
);
