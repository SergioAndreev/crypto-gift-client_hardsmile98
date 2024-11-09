const envsVariables = import.meta.env;

console.log(envsVariables);

const envs = {
  apiUrl: envsVariables.VITE_API_URL,
  isDev: envsVariables.MODE === 'development',
};

export { envs };
