/* eslint-disable prettier/prettier */
import eslintRecommended from '@eslint/js';
import googleConfig from 'eslint-config-google';
import prettier from 'eslint-plugin-prettier';
import jsdoc from 'eslint-plugin-jsdoc';
import prettierConfig from 'eslint-config-prettier';

export default [
  eslintRecommended.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    ...googleConfig,
  },
  {
    plugins: {
      prettier,
      jsdoc,
    },
    rules: {
      'prettier/prettier': 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
  prettierConfig,
];
