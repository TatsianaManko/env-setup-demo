const fetch = require("node-fetch");

const BASE_URL = "https://crudcrud.com/api/59272f848282460395ba8269dd827ede";

async function fetchJSON(url, ...args) {
  const response = await fetch(`${BASE_URL}${url}`, ...args);
  return response.json();
}

function createPerson(data) {
  return fetchJSON(`/people`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    redirect: "follow",
  });
}

function readPerson(id) {
  return fetchJSON(`/people/${id}`);
}

describe("CrudCrud: People", () => {
  it("can create a person", async () => {
    // создать фейковые данные
    const name = `${Math.random()}`;
    const age = Math.ceil(Math.random() * 100);
    // отправить запрос на создание с этими данными
    const createResponseData = await createPerson({ age, name });

    // проверить ответ от запроса (что там есть наши данные)
    expect(createResponseData).toEqual(
      expect.objectContaining({
        age,
        name,
        _id: expect.stringMatching(/\w+/),
      })
    );

    // отправить запрос на чтение созданной персоны
    const readPersonResponseData = readPerson(
      `/people/${createResponseData._id}`
    );

    // проверить ответ на данные, которые мы сгенерировали
    expect(readPersonResponseData).toEqual({
      age,
      name,
      _id: createResponseData._id,
    });
  });
});
