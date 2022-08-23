const { remote } = require("webdriverio");

(async () => {
  const browser = await remote({
    capabilities: {
      browserName: "chrome",
    },
  });

  await browser.url("https://xvjhzt.csb.app/");

  await browser.$("input").waitForExist({
    timeout: 5000,
  });
  const button = await browser.$("button");
  // type
  const input = await browser.$("input");

  console.log("@@Button is visible:", await button.isDisplayed());

  const pList = await browser.$$("p");
  const pListText = await Promise.all(pList.map((p) => p.getText()));

  console.log("@@Visible text:", pListText);

  await input.setValue("UpsilonIT");
  console.log("@@Button is visible:", await button.isDisplayed());
  console.log("@@Input value:", await input.getValue()); // function getInputValue

  // click button
  await button.click();
  console.log("@@Button is visible:", await button.isDisplayed());

  const pList2 = await browser.$$("p");
  const pListText2 = await Promise.all(pList2.map((p) => p.getText()));

  console.log("@@Visible text:", pListText2);

  // сделать клик по параграфам

  await browser.deleteSession();
})();
