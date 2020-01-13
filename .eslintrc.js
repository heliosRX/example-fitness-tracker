module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    'no-console': 'off',
    'no-debugger': 'off',
    'object-curly-spacing': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
}
