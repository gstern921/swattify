exports.catchAsync = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
    // next();
  } catch (err) {
    next(err);
  }
};

exports.constants = {
  SECOND_IN_MS: 1000,
  MINUTE_IN_MS: 60 * this.SECOND_IN_MS,
  HOUR_IN_MS: 60 * this.MINUTE_IN_MS,
  DAY_IN_MS: 24 * this.HOUR_IN_MS,
};

exports.normalizeUrl = (inputUrl, makeHttps = false) => {
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

exports.nullsafeToLower = (str) => {
  if (str && typeof str === 'string') {
    return str.toLowerCase();
  }
  return str;
};

exports.nullsafeTrimString = (str) => {
  if (str && typeof str === 'string') {
    return str.trim();
  }
  return str;
};

exports.requireEnvironmentVariables = (requiredVariables = []) => {
  const messages = [];
  requiredVariables.forEach((variable) => {
    if (process.env[variable] === undefined) {
      messages.push(variable);
    }
  });

  if (messages.length) {
    throw new Error(`Required Environment Variables ${messages.join(', ')} missing!`);
  }
};

exports.urlRegex = /^(?:https?:\/\/)?(?:www\.)?.+$/;
