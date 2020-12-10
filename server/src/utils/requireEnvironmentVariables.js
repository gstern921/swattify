const requireEnvironmentVariables = (requiredVariables: string[]) => {
  let messages = [];
  for (let variable of requiredVariables) {
    if (process.env[variable] === undefined) {
      messages.push(variable);
    }
  }
  if (messages.length) {
    throw new Error(`Required Environment Variables ${messages.join(', ')} missing!`);
  }
};

export default requireEnvironmentVariables;
