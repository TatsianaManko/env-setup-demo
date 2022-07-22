const fetch = require("node-fetch");

describe("CrudCrud: People", () => {
  it("can create a person", async () => {
    // создать фейковые данные
    const name = `${Math.random()}`;
    const age = Math.ceil(Math.random() * 100);

    // отправить запрос на создание с этими данными
    const body = JSON.stringify({
      name,
      age,
    });
    const createPersonRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
      redirect: "follow",
    };
    const createResponse = await fetch(
      "https://crudcrud.com/api/59272f848282460395ba8269dd827ede/people",
      createPersonRequestOptions
    );
    const createResponseData = await createResponse.json();
    console.log({ createResponseData });
    // проверить ответ от запроса (что там есть наши данные)
    // отправить запрос на чтение созданной персоны
    // проверить ответ на данные, которые мы сгенерировали
  });
});
