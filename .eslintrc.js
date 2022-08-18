module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  plugins: ["jest"],
  extends: ["airbnb-base", "prettier"],
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
