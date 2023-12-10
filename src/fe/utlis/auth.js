const AEM_RSVP_USER = "aem-rsvp-user";

export const saveAuthToken = token => {
  localStorage.setItem(AEM_RSVP_USER, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(AEM_RSVP_USER);
};

export const clearAuthToken = () => {
  localStorage.removeItem(AEM_RSVP_USER);
};

export const getAuthHeader = () => {
  const accessToken = localStorage.getItem(AEM_RSVP_USER);
  return { authorization: accessToken };
};

export const getApplicationJsonHeader = () => ({
  "Content-Type": "application/json"
});
