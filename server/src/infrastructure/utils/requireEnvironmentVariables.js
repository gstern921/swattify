const requireEnvironmentVariables = (requiredVariables = []) => {
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

module.exports = requireEnvironmentVariables;
