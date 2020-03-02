module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'plugin:prettier/recommended', 'prettier', 'prettier/vue'],
  plugins: ['prettier', 'vue'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-closing-bracket-newline': 2,
    'no-unused-vars': 'warn',
    quotes: ['error', 'single'],
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        singleQuote: true,
        semi: true,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'avoid',
        printWidth: 120,
      },
      {
        usePrettierrc: false,
      },
    ],
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
