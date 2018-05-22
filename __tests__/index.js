const plugin = require('../index.js')
const pluginTester = require('babel-plugin-tester')

const code = `export default '__babelPluginImageHelper__'`

pluginTester({
  plugin,
  pluginName: 'babel-plugin-imagehelper',
  pluginOptions: {path: './img'},

  tests: [
    {
      title: 'Transform',
      code,
      output: `
export default {
  'img.jpg': {
    path: 'img/img.jpg',
    width: 1200,
    widthPx: '1200px',
    height: 630,
    heightPx: '630px',
    aspectRatio: 0.525
  },
  'img.png': {
    path: 'img/img.png',
    width: 455,
    widthPx: '455px',
    height: 454,
    heightPx: '454px',
    aspectRatio: 0.9978021978021978
  },
  'img.svg': {
    path: 'img/img.svg',
    width: 580,
    widthPx: '580px',
    height: 580,
    heightPx: '580px',
    aspectRatio: 1
  },
  'subdir/img.jpg': {
    path: 'img/subdir/img.jpg',
    width: 1200,
    widthPx: '1200px',
    height: 630,
    heightPx: '630px',
    aspectRatio: 0.525
  }
};
`
    },
    {
      title: 'Snapshot',
      snapshot: true,
      code,
    },
  ],
})
