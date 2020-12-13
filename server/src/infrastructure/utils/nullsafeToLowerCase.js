module.exports = (str) => {
  if (str && typeof str === 'string') {
    return str.toLowerCase();
  }
  return str;
};
