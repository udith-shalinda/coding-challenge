import globals from 'globals'
import pluginJs from '@eslint/js'
import jest from 'eslint-plugin-jest'
import eslintPrettier from 'eslint-plugin-prettier/recommended'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['/dist'],
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    files: ['tests/**/*.js'],
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
      'jest/prefer-expect-assertions': 'off',
    },
  },
  eslintPrettier,
]
