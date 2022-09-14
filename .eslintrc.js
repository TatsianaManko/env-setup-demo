module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  plugins: ["jest", "@typescript-eslint"],
  extends: ["airbnb-base", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "max-len": [
      "error",
      { code: 100, ignoreComments: true, ignoreStrings: true },
    ],
    "import/prefer-default-export": "OFF",
    "no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "no-underscore-dangle": "OFF",
  },
};
