export default [
  {
    ignores: ['node_modules/**']
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly'
      }
    },
    rules: {
      'prefer-arrow-callback': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'arrow-body-style': ['error', 'always'],
      'consistent-return': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.name='require']",
          message: 'Use ESM import syntax instead of require().'
        },
        {
          selector: "AssignmentExpression[left.object.name='module'][left.property.name='exports']",
          message: 'Use ESM export syntax instead of module.exports.'
        },
        {
          selector: "CallExpression[callee.property.name='then']",
          message: 'Use async/await instead of .then().'
        },
        {
          selector: "CallExpression[callee.property.name='catch']",
          message: 'Use try/catch with async/await instead of .catch().'
        },
        {
          selector: "ExpressionStatement > CallExpression[callee.object.name='res'][callee.property.name=/^(json|send)$/]",
          message: 'Return Express responses, such as return res.status(200).json(data).'
        },
        {
          selector: "ExpressionStatement > CallExpression[callee.property.name=/^(json|send)$/][callee.object.callee.object.name='res']",
          message: 'Return Express responses, such as return res.status(200).json(data).'
        }
      ]
    }
  }
];