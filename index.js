const nodePath = require('path')
const fs = require('fs')
const glob = require('glob')
const imageSize = require('image-size')
const pluginName = 'babel-plugin-image-size'
const crypto = require('crypto')

const md5File = (content) => {
  const hash = crypto.createHash('md5')
  hash.update(content)
  return hash.digest('hex')
}

module.exports = function(babel) {
  const t = babel.types
  return {
    visitor: {
      StringLiteral: function StringLiteral(path, state) {
        if (path.node.value !== '__babelPluginImageHelper__') return

        const limit = state.opts.limit || 10000 // Byte limit to inline files as Data URL
        const hashLength = state.opts.hashLength || 8
        const imgDir = state.opts.path
        let files = glob.sync(nodePath.join(imgDir, '**/*.{jpg,jpeg,png,gif,svg}'))

        const nodes = files.map(imgPath => {
          let dimensions

          try {
            dimensions = imageSize(imgPath)
          } catch(e) {
            console.log(`${pluginName}: ${e} (${imgPath})`)
            return
          }

          const imgData = fs.readFileSync(imgPath, 'base64')
          const stats = fs.statSync(imgPath)
          let md5sum = md5File(imgData)
          md5sum = md5sum.substr(md5sum.length - hashLength, hashLength)

          const imgAbsPath = nodePath.join('.', imgPath)
          const key = nodePath.relative(imgDir, imgAbsPath)

          const properties = [
            t.objectProperty(
              t.identifier('path'),
              t.stringLiteral(imgPath),
            ),
            t.objectProperty(
              t.identifier('ext'),
              t.stringLiteral(nodePath.extname(imgPath).toLowerCase()),
            ),
            t.objectProperty(
              t.identifier('width'),
              t.numericLiteral(dimensions.width),
            ),
            t.objectProperty(
              t.identifier('widthPx'),
              t.stringLiteral(`${dimensions.width}px`),
            ),
            t.objectProperty(
              t.identifier('height'),
              t.numericLiteral(dimensions.height),
            ),
            t.objectProperty(
              t.identifier('heightPx'),
              t.stringLiteral(`${dimensions.height}px`),
            ),
            t.objectProperty(
              t.identifier('aspectRatio'),
              t.numericLiteral(dimensions.height / dimensions.width),
            ),
            t.objectProperty(
              t.identifier('hash'),
              t.stringLiteral(md5sum),
            ),
          ]

          if (stats.size <= limit) {
            properties.push(t.objectProperty(
              t.identifier('data'),
              t.stringLiteral(imgData),
            ))
          }

          return t.objectProperty(
            t.identifier(`'${key}'`),
            t.objectExpression(properties)
          )
        })

        path.replaceWith(t.objectExpression(nodes))
      },
    }
  }
}
