import {
  getFormCSRF,
  signUpForm,
  checkSuccessRedirect,
  getEmailWithConfirmationLink,
  openConfirmationLink,
  generateUserDataWithEmail,
} from "./utils/gitflic";

jest.setTimeout(30_000);

describe("GitFlic.ru", () => {
  describe("Registration", () => {
    it("can create new user", async () => {
      const userData = await generateUserDataWithEmail();

      const csrf = await getFormCSRF();

      const signUpResponse = await signUpForm(csrf, userData);

      await checkSuccessRedirect(signUpResponse);

      const link = await getEmailWithConfirmationLink(userData.email);

      await openConfirmationLink(link);
    });
  });
});
