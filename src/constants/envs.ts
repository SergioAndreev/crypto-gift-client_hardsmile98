const envsVariables = import.meta.env;

const envs = {
  apiUrl: envsVariables.VITE_API_URL,
  isDev: envsVariables.MODE === 'development',
};

export { envs };
