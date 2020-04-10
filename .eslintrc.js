module.exports = {
  root: true,

  env: {
    browser: true,
    node: true
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  extends: [
    '@nuxtjs',
    'airbnb-base',
    // 'plugin:vue/recommended',
  ],

  rules: {
    indent: 'off',
    'indent-legacy': ['error', 'tab'],
    'no-tabs': 'off',
    'vue/html-indent': ['error', 'tab'],

    'max-len': 'off',
    "vue/max-len": ["error", {
      "code": 100,
      "template": 100,
      "comments": 80,
      "ignoreComments": true,
      "ignoreTrailingComments": false,
      "ignoreUrls": false,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": false,
      "ignoreRegExpLiterals": false,
      "ignoreHTMLAttributeValues": true,
      "ignoreHTMLTextContents": false,
    }],

    'import/no-unresolved': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
