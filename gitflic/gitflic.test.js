import {
  getFormCSRF,
  signUpForm,
  checkSuccessRedirect,
  getEmailWithConfirmationLink,
  openConfirmationLink,
  generateUserDataWithEmail,
  generateUserDataWithEmailAndPass,
  matchText,
  generateUserDataWithExistData,
  matchTextWithExistData,
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

    //-------------------------------------------------------
    it("can't create new user with password = 1", async () => {
      const userData = await generateUserDataWithEmailAndPass();

      const csrf = await getFormCSRF();

      const signUpResponse = await signUpForm(csrf, userData);

      await matchText(signUpResponse);
    });

    it("can't create an existing user ", async () => {
      const userDataExist = await generateUserDataWithExistData();
      const csrf1 = await getFormCSRF();
      const signUpResponse1 = await signUpForm(csrf1, userDataExist);
      await matchTextWithExistData(signUpResponse1);
    });
  });
});
