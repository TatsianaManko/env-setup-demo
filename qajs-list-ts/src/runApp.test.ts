/**
 * @jest-environment jsdom
 */
import { runApp } from "./runApp";

describe("runApp", () => {
  it("is a function", () => {
    expect(runApp).toBeInstanceOf(Function);
  });
  let el: HTMLDivElement;
  let input: HTMLInputElement;
  let button: HTMLButtonElement;
  beforeEach(() => {
    el = document.createElement("div");
    runApp(el);
    button = el.querySelector("button") as HTMLButtonElement;
    let potentialInput = el.querySelector("input");
    if (potentialInput) {
      input = potentialInput;
    }
  });

  function type(text) {
    input.value = text;
    input.dispatchEvent(new Event("input", {}));
  }

  function getParagraphs() {
    // const listofP = el.querySelectorAll("p");
    // const arrayofP = Array.from(listofP);
    // //const pTexts - arrayofP.map((p) => p.innerHTML);
    // let pTexts = [];
    // for (let i=0; i< arrayofP.length; i++) {
    //   pTexts.push(arrayofP[i].inneritHTML);
    // }
    // return pTexts;
    return Array.from(el.querySelectorAll("p")).map((pEL) => pEL.innerHTML);
  }

  function clickButton() {
    button.click();
  }
  //----------
  function clickParagraph(index) {
    el.querySelectorAll("p")[index].click();
  }
  //-------------
  function isButtonHidden() {
    return button.hidden;
  }

  function getInputValue() {
    return input.value;
  }

  it("renders 3 paragraphs and input", () => {
    // подготовка
    // const el = document.createElement("div");

    // выполнение кода
    // runApp(el);

    // проверки
    // 3 параграфа
    expect(getParagraphs()).toEqual(["1", "2", "3"]);
    // поле ввода
    expect(el.querySelectorAll("input").length).toBe(1);
  });

  it("renders hidden button", () => {
    expect(isButtonHidden()).toBe(true);
  });

  it("renders button which appears on input and disappears on clear", () => {
    // ввести текст
    type("123");

    expect(isButtonHidden()).toBe(false);

    type("");
    expect(isButtonHidden()).toBe(true);
  });

  it("adds new paragraph on button click", () => {
    type("123");

    clickButton();

    expect(getParagraphs().length).toBe(4);

    expect(getParagraphs()[0]).toBe("123");

    expect(isButtonHidden()).toBe(true);
    expect(getInputValue()).toBe("");
  });

  it("adds maximum 5 paragraphs", () => {
    ["123", "234", "345"].forEach((text) => {
      type(text);
      clickButton();
    });
    expect(getParagraphs()).toEqual(["345", "234", "123", "1", "2"]);
  });

  //----
  it("delete paragraph on click", () => {
    clickParagraph(1);
    expect(getParagraphs()).toEqual(["1", "3"]);

    type("123");
    clickButton();

    clickParagraph(0);
    expect(getParagraphs().length).toBe(2);
    expect(getParagraphs()).toEqual(["1", "3"]);
  });
  //----
});
