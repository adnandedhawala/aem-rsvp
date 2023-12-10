import {
  getApiUrl,
  getApplicationJsonHeader,
  getAuthHeader,
  handleResponse
} from "../utlis";

export const getMemberDetails = async data => {
  return fetch(getApiUrl("member"), {
    method: "POST",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader()
    },
    body: JSON.stringify({ data: data })
  })
    .then(handleResponse)
    .then(data => data.data);
};
