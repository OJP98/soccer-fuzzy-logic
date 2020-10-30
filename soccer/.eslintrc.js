module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    semi: [
      'error',
      'never',
    ],
    'linebreak-style': [
      0,
      'error',
      'windows',
    ],
    'react/prop-types': 0,
    'no-console': 'off',
  },
}
