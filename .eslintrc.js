const reactPaths = ['domains/**/*.{js,ts,jsx,tsx}'];
const vuePaths = ['domains/**/*.{js,ts,vue}'];

module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  overrides: [
    {
      files: reactPaths,
      ...require('./.eslintrc.react.js'),
    },
    {
      files: vuePaths,
      ...require('./.eslintrc.vue.js'),
    },
  ],
};
