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
          ext: '.jpg',
          width: 1200,
          widthPx: '1200px',
          height: 630,
          heightPx: '630px',
          aspectRatio: 0.525,
          hash: '741d27da'
        },
        'img.png': {
          path: 'img/img.png',
          ext: '.png',
          width: 455,
          widthPx: '455px',
          height: 454,
          heightPx: '454px',
          aspectRatio: 0.9978021978021978,
          hash: '80050422'
        },
        'img.svg': {
          path: 'img/img.svg',
          ext: '.svg',
          width: 580,
          widthPx: '580px',
          height: 580,
          heightPx: '580px',
          aspectRatio: 1,
          hash: 'ecb357cd',
          data: 'PHN2ZyB2aWV3Qm94PSIwIDAgNTgwIDU4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8cmVjdCBpZD0iYSIgd2lkdGg9IjU4MCIgaGVpZ2h0PSI1ODAiIHJ4PSIyOTAiLz4KICA8L2RlZnM+CiAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxtYXNrIGlkPSJiIiBmaWxsPSIjZmZmIj4KICAgICAgPHVzZSB4bGluazpocmVmPSIjYSIvPgogICAgPC9tYXNrPgogICAgPHVzZSBmaWxsPSIjNEU2RjgyIiB4bGluazpocmVmPSIjYSIvPgogICAgPHJlY3QgZmlsbD0iI0QyREZFNyIgbWFzaz0idXJsKCNiKSIgdHJhbnNmb3JtPSJyb3RhdGUoMTAgMzIzIDQwMS41KSIgeD0iMTczIiB5PSIxNjciIHdpZHRoPSIzMDAiIGhlaWdodD0iNDY5IiByeD0iMTAiLz4KICAgIDxyZWN0IGZpbGw9IiNGRkYiIG1hc2s9InVybCgjYikiIHg9IjE0MCIgeT0iMTQzIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ2OSIgcng9IjEwIi8+CiAgICA8cmVjdCBmaWxsPSIjNEU2RjgyIiBtYXNrPSJ1cmwoI2IpIiB4PSIxODAiIHk9IjQzMCIgd2lkdGg9IjIyMCIgaGVpZ2h0PSIxMCIgcng9IjUiLz4KICAgIDxyZWN0IGZpbGw9IiM0RTZGODIiIG1hc2s9InVybCgjYikiIHg9IjE4MCIgeT0iNDU4IiB3aWR0aD0iMjA3IiBoZWlnaHQ9IjYiIHJ4PSIzIi8+CiAgICA8cmVjdCBmaWxsPSIjNEU2RjgyIiBtYXNrPSJ1cmwoI2IpIiB4PSIxODAiIHk9IjQ3NCIgd2lkdGg9IjIxNCIgaGVpZ2h0PSI2IiByeD0iMyIvPgogICAgPHJlY3QgZmlsbD0iIzRFNkY4MiIgbWFzaz0idXJsKCNiKSIgeD0iMTgwIiB5PSI0OTAiIHdpZHRoPSIyMDkiIGhlaWdodD0iNiIgcng9IjMiLz4KICAgIDxyZWN0IGZpbGw9IiM0RTZGODIiIG1hc2s9InVybCgjYikiIHg9IjE4MCIgeT0iNTA2IiB3aWR0aD0iMTk0IiBoZWlnaHQ9IjYiIHJ4PSIzIi8+CiAgICA8cmVjdCBmaWxsPSIjNEU2RjgyIiBtYXNrPSJ1cmwoI2IpIiB4PSIxODAiIHk9IjUyMiIgd2lkdGg9IjIwNyIgaGVpZ2h0PSI2IiByeD0iMyIvPgogICAgPHRleHQgbWFzaz0idXJsKCNiKSIgZm9udC1mYW1pbHk9Ik51bml0by1CbGFjaywgTnVuaXRvIiBmb250LXNpemU9IjE0NCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0ZGMzk3MyI+CiAgICAgIDx0c3BhbiB4PSIxNjAiIHk9IjM0OSI+NDA0PC90c3Bhbj4KICAgIDwvdGV4dD4KICAgIDx0ZXh0IG1hc2s9InVybCgjYikiIGZvbnQtZmFtaWx5PSJPcGVuU2Fucy1TZW1pYm9sZCwgT3BlbiBTYW5zIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iNTAwIiBmaWxsPSIjNEU2RjgyIj4KICAgICAgPHRzcGFuIHg9IjE2MCIgeT0iMjI3Ij5SRVBPUlQ8L3RzcGFuPgogICAgPC90ZXh0PgogIDwvZz4KPC9zdmc+Cg=='
        },
        'subdir/img.jpg': {
          path: 'img/subdir/img.jpg',
          ext: '.jpg',
          width: 1200,
          widthPx: '1200px',
          height: 630,
          heightPx: '630px',
          aspectRatio: 0.525,
          hash: '741d27da'
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
