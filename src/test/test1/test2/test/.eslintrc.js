module.exports = {
  extends: ['next', 'next/core-web-vitals', 'prettier'],
  rules: {
    'react-hooks/exhaustive-deps': [2],
    '@next/next/no-img-element': [0],
    'no-unused-vars': [0],
  },
  ignorePatterns: [
    '.prettierrc.js',
    '.eslintrc.js',
    'next.config.js',
    '**/.next/**',
    '**/.fttemplates/**',
  ],
};
