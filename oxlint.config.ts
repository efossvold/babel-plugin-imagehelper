import { defineConfig } from 'oxlint'

export default defineConfig({
  categories: {
    correctness: 'error',
    nursery: 'warn',
    pedantic: 'off',
    perf: 'warn',
    restriction: 'off',
    style: 'off',
    suspicious: 'warn',
  },
  env: {
    builtin: true,
    node: true,
    vitest: true,
  },
  globals: {
    Bun: 'readonly',
  },
  ignorePatterns: ['.vscode', 'dist', 'node_modules'],
  options: {
    reportUnusedDisableDirectives: 'allow',
  },
  plugins: ['eslint', 'oxc', 'import'],
  rules: {
    'no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }],

    /**
     * Import
     */
    'import/no-anonymous-default-export': ['off'],
    'import/no-cycle': ['warn', { ignoreExternal: true }],

    'vitest/require-hook': 'off',
  },
})
