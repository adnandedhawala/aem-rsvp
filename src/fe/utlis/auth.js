export const saveAuthToken = token => {
  localStorage.setItem("aem_houses_user", token);
};

export const getAuthToken = () => {
  return localStorage.getItem("aem_houses_user");
};

export const clearAuthToken = () => {
  localStorage.removeItem("aem_houses_user");
};

export const getAuthHeader = () => {
  const accessToken = localStorage.getItem("aem_houses_user");
  return { authorization: accessToken };
};

export const getApplicationJsonHeader = () => ({
  "Content-Type": "application/json"
});
