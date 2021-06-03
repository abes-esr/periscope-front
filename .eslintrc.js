module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/typescript/recommended', '@vue/prettier/', '@vue/prettier/@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2019,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        mocha: true,
      },
    },
    {
      // disable the rule specifically for Project source code files (extensions)
      files: ['*.ts', '*.tsx', '*.vue'],
      rules: {
        // disable rule for obligation to have a return type
        '@typescript-eslint/explicit-function-return-type': ['off'],
        // disable rule for no explicity any
        '@typescript-eslint/no-explicit-any': ["off", { "ignoreRestArgs": true }],
        // disable rule for obligation to have a return type
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
  ],
};
