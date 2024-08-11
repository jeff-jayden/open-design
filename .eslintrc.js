module.exports = {
  root: true,
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true
  },
  plugins: ['vue'],
  extends: [
    "airbnb",
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: '6'
  },
  rules: {
    "indent": [
      "error",
      4
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
}
