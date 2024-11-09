import globals from 'globals';
import pluginJs from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginA11y from 'eslint-plugin-jsx-a11y';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import parser from '@typescript-eslint/parser';

export default [
  // Настройки для файлов и парсера
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.browser,
    },
  },

  // Подключение плагинов как объектов
  {
    plugins: {
      js: pluginJs,
      '@typescript-eslint': tsPlugin,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginA11y,
      import: pluginImport,
      prettier: pluginPrettier,
    },
  },

  // Дополнительные настройки и правила
  {
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      // Отключаем или настраиваем правила TypeScript
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Правила для хуков
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Настройки для Prettier
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
          singleQuote: true,
        },
      ],
    },
  },
];
