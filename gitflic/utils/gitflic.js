import originFetch from "node-fetch";
import qs from "qs";
import makeFetchCookie from "fetch-cookie";

const E2EMailbox = require("e2e-mailbox").default;

const cookiesJar = new makeFetchCookie.toughCookie.CookieJar();
const fetch = makeFetchCookie(originFetch, cookiesJar);
const mailbox = new E2EMailbox();

export async function generateUserDataWithEmail() {
  const email = await mailbox.createEmailAddress();
  const username = email;
  const password = email;
  const passwordConfirm = password;

  return {
    username,
    email,
    password,
    passwordConfirm,
    _consentApplied: "on",
    consentApplied: "on",
  };
}

export async function getFormCSRF() {
  const response = await fetch("https://gitflic.ru/auth/signup");
  const html = await response.text();
  const match = html.match(/name="_csrf" value="(.+)"/);
  return match[1];
}

export async function signUpForm(csrf, userData) {
  const body = qs.stringify({
    _csrf: csrf,
    ...userData,
  });

  return fetch("https://gitflic.ru/user/sign-up", {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,ru;q=0.8",
      "content-type": "application/x-www-form-urlencoded",
      Referer: "https://gitflic.ru/auth/signup",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body,
    method: "POST",
  });
}

export async function checkSuccessRedirect(signUpFormResult) {
  const pageHtml = await signUpFormResult.text();
  if (!pageHtml.includes("было выслано письмо")) {
    console.log({ pageHtml });
    throw new Error("wrong page");
  }
}

export async function getEmailWithConfirmationLink() {
  let emailsList = [];
  while (emailsList.length === 0) {
    // eslint-disable-next-line
    emailsList = await mailbox.fetchEmailList();
  }
  return emailsList[0].mail_body.match(
    /https:\/\/gitflic\.ru\/user\/confirm\/\w+/
  )[0];
}

export async function openConfirmationLink(link) {
  const response = await fetch(link);
  const html = await response.text();
  if (!html.includes("Спасибо, Ваш Email подтвержден")) {
    throw new Error(`failed to confirm email: ${html}`);
  }
}
