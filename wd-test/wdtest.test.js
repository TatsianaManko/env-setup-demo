/* eslint-disable no-await-in-loop */

const { remote } = require("webdriverio");

function sleep(x) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, x));
}
jest.setTimeout(30000);

describe("List of paragraphs", () => {
  let browser;
  let input;
  let button;
  beforeEach(async () => {
    browser = await remote({
      capabilities: {
        browserName: "chrome",
      },
    });
    await browser.url("https://xvjhzt.csb.app/");
    await browser.$("input").waitForExist({
      timeout: 5000,
    });
    input = await browser.$("input");
    button = await browser.$("button");
  });
  afterEach(async () => {
    await browser.deleteSession();
    await sleep(1000);
  });

  async function isInputVisible() {
    // eslint-disable-next-line no-return-await
    return await input.isDisplayed();
  }

  async function getParagraphs() {
    const pList = await browser.$$("p");
    const pListText = await Promise.all(pList.map((p) => p.getText()));
    return pListText;
  }

  async function type(str) {
    return input.setValue(str);
  }

  async function clickButton() {
    // eslint-disable-next-line no-return-await
    return await button.click();
  }

  async function isButtonHidden() {
    // eslint-disable-next-line no-return-await
    return !(await button.isDisplayed());
  }

  async function getInputValue() {
    // eslint-disable-next-line no-return-await
    return await input.getValue();
  }

  async function clickParagraph(index) {
    const p = browser.$$("p")[index];
    // eslint-disable-next-line no-return-await
    return await p.click();
  }

  it("render 3 paragraphs and input", async () => {
    expect(await getParagraphs()).toEqual(["1", "2", "3"]);
    // поле ввода
    expect(await isInputVisible()).toBe(true);
    // expect(el.querySelectorAll('input').length).toBe(1);
  });

  it("adds new paragraph on button click", async () => {
    await type("123");

    await clickButton();

    expect((await getParagraphs()).length).toBe(4);

    expect((await getParagraphs())[0]).toBe("123");
    expect(await isButtonHidden()).toBe(true);
    expect(await getInputValue()).toBe("");
  });

  it("adds maximum 5 paragraphs", async () => {
    const texts = ["123", "234", "345"];
    // eslint-disable-next-line no-restricted-syntax, prefer-const
    for (let text of texts) {
      await type(text);
      await clickButton();
    }
    expect(await getParagraphs()).toEqual(["345", "234", "123", "1", "2"]);
  });

  it("delete paragraph on click", async () => {
    await clickParagraph(1);
    expect(await getParagraphs()).toEqual(["1", "3"]);

    await type("123");
    await clickButton();

    await clickParagraph(0);
    expect(await getParagraphs()).toEqual(["1", "3"]);
  });
});
