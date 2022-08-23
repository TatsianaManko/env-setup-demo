const fetch = require("node-fetch").default;

const BASE_URL = "https://crudcrud.com/api/606fe188698641da9eddea69517b03a5";

async function fetchJSON(url, ...args) {
  const response = await fetch(`${BASE_URL}${url}`, ...args);
  return response.json();
}

export function createPerson(data) {
  return fetchJSON(`/people`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function readPerson(id) {
  return fetchJSON(`/people/${id}`);
}

export async function updatePerson(id, data) {
  const { _id, ...dataWithoutId } = data;
  const response = await fetch(`${BASE_URL}/people/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataWithoutId),
  });
  if (response.ok) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
}

export async function deletePerson(id) {
  const response = await fetch(`${BASE_URL}/people/${id}`, {
    method: "DELETE",
  });
  return response.text();
}
