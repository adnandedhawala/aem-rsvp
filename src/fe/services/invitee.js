import {
  getApiUrl,
  getApplicationJsonHeader,
  getAuthHeader,
  handleResponse
} from "../utlis";

export const getInviteeList = async () => {
  return fetch(getApiUrl("inviteeList"), {
    method: "GET",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader()
    }
  })
    .then(handleResponse)
    .then(data => data.data);
};

export const resetInviteeList = async () => {
  return fetch(getApiUrl("inviteeList"), {
    method: "PUT",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader()
    }
  })
    .then(handleResponse)
    .then(data => data);
};
