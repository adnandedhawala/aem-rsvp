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

export const findInvitees = async data => {
  return fetch(
    getApiUrl("invitee") + "?file=" + data.fileNumber + "&itsId=" + data.itsId,
    {
      method: "GET",
      headers: {
        ...getApplicationJsonHeader(),
        ...getAuthHeader()
      }
    }
  )
    .then(handleResponse)
    .then(data => data.data || []);
};

export const addInvitee = async inviteeData => {
  return fetch(getApiUrl("invitee"), {
    method: "POST",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader()
    },
    body: JSON.stringify({ data: inviteeData })
  })
    .then(handleResponse)
    .then(data => data);
};

export const updateInviteeResponse = async (fileNumber, inviteeData) => {
  return fetch(getApiUrl("invitee") + "?file=" + fileNumber, {
    method: "PUT",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader()
    },
    body: JSON.stringify({ data: inviteeData })
  })
    .then(handleResponse)
    .then(data => data);
};
