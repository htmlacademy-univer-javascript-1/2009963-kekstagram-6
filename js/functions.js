const isStringShort = (str, length) => str.length <= length;

const isPalindrome = (str) => {
  const normalizedString = str.replaceAll(' ', '').toLowerCase();
  return normalizedString === normalizedString.split('').reverse().join('');
};

const getCounts = (input) => {
  const result = [];
  input.toString().split('').forEach((char) => {
    if (parseInt(char, 10)) {
      result.push(char);
    }
  });
  return parseInt(result.join(''), 10);
};

export {
  isStringShort,
  isPalindrome,
  getCounts
};
