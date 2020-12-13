module.exports = (str) => {
  if (str && typeof str === 'string') {
    return str.trim();
  }
  return str;
};
