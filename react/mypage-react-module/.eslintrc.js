module.exports = {
  extends: [
    '@gogo/eslint-config/nextjs'
  ],
  plugins: [
    '@emotion'
  ],
  rules: {
    '@next/next/no-server-import-in-page': 0,
    'jsx-a11y/alt-text': [ 2, {
      'elements': [ 'img', 'object', 'area', 'input[type=\'image\']' ],
      'img': ['Image'],
      'object': ['Object'],
      'area': ['Area'],
      'input[type=\'image\']': ['InputImage']
    }]
  }
}
