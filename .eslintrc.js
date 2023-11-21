module.exports = {
  extends: 'next',
  rules: {
    // Add or modify spacing rules here
    'indent': ['error', 2], // Use 2 spaces for indentation
    // Rule to check for unused imports
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
    'import/order': [
      'error',
      {
        'groups': [['builtin', 'external'], 'internal'],
      },
    ],
  },
};