module.exports = {
   extends: [
      'airbnb-typescript',
      'airbnb/hooks',
      'plugin:@typescript-eslint/recommended',
      'plugin:jest/recommended',
      'plugin:prettier/recommended'
   ],
   plugins: ['react', '@typescript-eslint', 'jest'],
   env: {
      browser: true,
      es6: true,
      jest: true
   },
   globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly'
   },
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaFeatures: {
         jsx: true
      },
      ecmaVersion: 2018,
      sourceType: 'module',
      project: './tsconfig.json'
   },
   rules: {
      'no-useless-concat': 'off',
      'no-empty-function': 'off',
      'react/react-in-jsx-scope': 'off',
      // "@typescript-eslint/no-empty-function": "warn",
      // "@typescript-eslint/no-explicit-any": "error",
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',

      'linebreak-style': 'off',
      'prettier/prettier': [
         'error',
         {
            endOfLine: 'auto'
         }
      ],
      'no-unused-expressions': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn'
   }
}
