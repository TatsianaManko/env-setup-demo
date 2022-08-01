import { createPerson, readPerson, updatePerson } from "./utils/crud";

function getRandomName(prefix = "") {
  return `${prefix}${Math.random()}`;
}

function randomNumber1to100() {
  return Math.ceil(Math.random() * 100);
}

describe("CrudCrud: People", () => {
  let name;
  let age;
  beforeEach(() => {
    name = getRandomName();
    age = randomNumber1to100();
  });
  it("can create a person", async () => {
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
    const readPersonResponseData = await readPerson(createResponseData._id);
    // проверить ответ на данные, которые мы сгенерировали
    expect(readPersonResponseData).toEqual({
      age,
      name,
      _id: createResponseData._id,
    });
  });

  it("can update a person", async () => {
    // создать пользователя
    const createResponseData = await createPerson({ age, name });
    // создать новое имя
    const newName = getRandomName("new");
    // обновить пользователя
    await updatePerson(createResponseData._id, {
      ...createResponseData,
      name: newName,
    });
    // прочитать пользователя
    // проверить имя
    const readPersonResponseData = await readPerson(createResponseData._id);
    expect(readPersonResponseData).toEqual({
      age,
      name: newName,
      _id: createResponseData._id,
    });
  });
});
