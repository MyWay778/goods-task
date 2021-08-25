module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // 'plugin:vue/essential', plugin for Vue
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    // 'vue', for Vue
  ],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
  },
};
