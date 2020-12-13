module.exports = (inputUrl, makeHttps = false) => {
  let url = inputUrl;
  if (!url) {
    return url;
  }
  url = url.toLowerCase();

  if (url.startsWith('http://')) {
    if (makeHttps) {
      return `${inputUrl.substring(0, 4)}s${inputUrl.subString(4)}`;
    }
    return inputUrl;
  }

  if (url.startsWith('www.') || url.startsWith('https://')) {
    return inputUrl;
  }

  return makeHttps ? `https://${inputUrl}` : `http://${inputUrl}`;
};
