module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'plugin:node/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['node', 'react', 'prettier'],
  rules: {
    'node/shebang': 'error',
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'func-names': 'off',
    'no-process-exit': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'block-spacing': 'error',
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'block' },
      { blankLine: 'always', prev: 'block', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],
    'lines-between-class-members': ['error', 'always'],
    'newline-before-return': 'error',
  },
};
