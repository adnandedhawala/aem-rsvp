import {
  getApiUrl,
  getApplicationJsonHeader,
  getAuthHeader,
  handleResponse
} from "../utlis";

export const getHouseList = async () => {
  return fetch(getApiUrl("houses"), {
    method: "GET",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader()
    }
  })
    .then(handleResponse)
    .then(data => data.data);
};

export const addHouse = async data => {
  return fetch(getApiUrl("houses"), {
    method: "POST",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader()
    },
    body: JSON.stringify({ data })
  }).then(handleResponse);
};

export const adminEditHouses = async data => {
  return fetch(getApiUrl("houses"), {
    method: "PUT",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader()
    },
    body: JSON.stringify({ data })
  }).then(handleResponse);
};

export const editHouseVisitStatus = async (id, data) => {
  return fetch(getApiUrl("housesVisit") + "/" + id, {
    method: "PATCH",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader()
    },
    body: JSON.stringify({ data })
  }).then(handleResponse);
};
