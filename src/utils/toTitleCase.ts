export const toTitleCase = (str: string, separator: string = ' ') => {
  return str
    .toLowerCase()
    .split(separator)
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};
