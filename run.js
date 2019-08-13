// run.js
const path = require('path')
const babel = require('@babel/core')
const fs = require('fs')
const plugin = require('./index.js')

const fileName = process.argv[2] || 'example.js'

if (!fs.existsSync(fileName)) throw Error(`File '${fileName}' not found`)

const out = babel.transformFileSync(fileName, {
  plugins: [[plugin, {
    path: path.join(__dirname, '/img'),
    httpPath: '/static',
    // props: ['httpPath', 'width', 'height', 'hash'],
  }]],
  babelrc: false // So we don't get babelrc from whole project
}).code

console.log(out)
