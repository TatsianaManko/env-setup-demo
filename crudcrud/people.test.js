import Jabber from "jabber";
import {
  createPerson,
  readPerson,
  updatePerson,
  deletePerson,
} from "./utils/crud";

const jabber = new Jabber();

function getRandomName(prefix = "") {
  return prefix + jabber.createFullName();
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

  describe("Operations with person", () => {
    let userData;
    beforeEach(async () => {
      userData = await createPerson({ age, name });
    });
    it("can update a person", async () => {
      // создать новое имя
      const newName = getRandomName("new");
      // обновить пользователя
      await updatePerson(userData._id, {
        ...userData,
        name: newName,
      });
      // прочитать пользователя
      // проверить имя
      const readPersonResponseData = await readPerson(userData._id);
      expect(readPersonResponseData).toEqual({
        age,
        name: newName,
        _id: userData._id,
      });
    });
    it("can delete a person", async () => {
      await deletePerson(userData._id);

      const readPersonResponseData = await readPerson(userData._id);
      expect(readPersonResponseData).toEqual(
        expect.objectContaining({
          status: 404,
          title: "Not Found",
          traceId: expect.stringMatching(/.+/),
        })
      );
    });
  });
});
