import globals from 'globals'

import js from '@eslint/js'
import ts from 'typescript-eslint'

import prettier from 'eslint-plugin-prettier'

import jest from 'eslint-plugin-jest'

/** @type{import('eslint').Linter.Config[]} */
const config = ts.config(
  js.configs.recommended,
  ts.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  {
    plugins: {
      prettier
    },
    rules: {
      ...prettier.configs.recommended.rules
    }
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    plugins: {
      jest
    },
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    rules: {
      ...jest.configs['flat/recommended'].rules
    }
  }
)

export default config
