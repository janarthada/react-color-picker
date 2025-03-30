module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-undef': 'off', // Disable the no-undef rule since we're using global declarations
  },
  globals: {
    EyeDropper: 'readonly',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}; 