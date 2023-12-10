import { logout } from "../services";

const isValidJSON = string_ => {
  try {
    JSON.parse(string_);
    return true;
  } catch {
    return false;
  }
};

export const handleResponse = response => {
  return response
    .text()
    .then(text => {
      const data = isValidJSON(text) ? JSON.parse(text) : text;
      if (!response.ok) {
        if (response.status === 401 || response.status === 403)
          throw "token error";
        throw data;
      }
      return data;
    })
    .catch(error => {
      if (error !== "token error") throw error;
      logout();
      if (window !== undefined) {
        window.location.href = "/";
      }
    });
};

export const handleLoginResponse = response => {
  return response.text().then(text => {
    const data = isValidJSON(text) ? JSON.parse(text) : text;
    if (!response.ok) {
      throw data;
    }
    return data;
  });
};
