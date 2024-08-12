// Babel预设是Babel转换代码时使用的，而ESLint配置是用于代码质量和风格检查，两者不直接相关

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    es6: true
  },
  plugins: ['vue'],
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: '6'
  },
  rules: {
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Function: false,
          Object: false
        }
      }
    ],
    'no-shadow': 'off',
    'no-await-in-loop': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always'
      }
    ]
  }
};
