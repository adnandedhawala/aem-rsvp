import {
  clearAuthToken,
  getApiUrl,
  getApplicationJsonHeader,
  getAuthToken,
  handleLoginResponse
} from "../utlis";

export const login = loginInfo => {
  return fetch(getApiUrl("login"), {
    method: "POST",
    headers: {
      ...getApplicationJsonHeader()
    },
    body: JSON.stringify({ data: loginInfo })
  }).then(handleLoginResponse);
};

export const logout = () => {
  clearAuthToken();
};

export const verifyUser = async () => {
  const accessToken = getAuthToken();
  if (!accessToken) throw "access token not found!";
  return fetch(getApiUrl("verify"), {
    method: "POST",
    headers: {
      ...getApplicationJsonHeader()
    },
    body: JSON.stringify({ data: accessToken })
  }).then(handleLoginResponse);
};
