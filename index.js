const nodePath = require('path')
const fs = require('fs')
const glob = require('tiny-glob/sync')
const imageSize = require('image-size')
const pluginName = 'babel-plugin-image-size'
const crypto = require('crypto')

const md5File = (content) => crypto.createHash('md5').update(content).digest('hex')

const IMG_PROPS = ['src', 'absPath', 'ext', 'width', 'widthPx', 'height', 'heightPx', 'aspectRatio', 'hash', 'data']

module.exports = function(babel) {
  const t = babel.types

  return {
    visitor: {
      StringLiteral: function StringLiteral(path, state) {
        if (path.node.value !== '__babelPluginImageHelper__') return

        const limit = state.opts.limit || 10000 // Byte limit to inline files as Data URL
        const hashLength = state.opts.hashLength || 8
        const imgDir = state.opts.path
        const imgProps = state.opts.props || IMG_PROPS

        imgProps.forEach(prop => {
          if (!IMG_PROPS.includes(prop)) {
            throw new Error(`Property '${prop}' is invalid. Valid properties are ${IMG_PROPS.join(', ')}`)
          }
        })

        const files = glob(nodePath.join('**/*.{jpg,jpeg,png,gif,svg}'), {
          cwd: imgDir,
          absolute: true,
        })

        const nodes = files.map(imgPath => {
          let dimensions

          try {
            dimensions = imageSize(imgPath, null)
          } catch(e) {
            console.log(`${pluginName}: ${e} (${imgPath})`)
            return
          }

          const key = nodePath.relative(imgDir, imgPath)
          const imgHTTPPath = nodePath.join(state.opts.httpPath ||  '', key)
          const imgData = fs.readFileSync(imgPath, 'base64')
          const stats = fs.statSync(imgPath)
          let md5sum = md5File(imgData)
          md5sum = md5sum.substr(md5sum.length - hashLength, hashLength)

          const properties = []

          if (imgProps.includes('absPath')) {
            properties.push(
              t.objectProperty(
                t.identifier('path'),
                t.stringLiteral(imgPath),
              )
            )
          }

          if (imgProps.includes('ext')) {
            properties.push(
              t.objectProperty(
                t.identifier('ext'),
                t.stringLiteral(nodePath.extname(imgPath).toLowerCase()),
              )
            )
          }

          if (imgProps.includes('src')) {
            properties.push(
              t.objectProperty(
                t.identifier('src'),
                t.stringLiteral(imgHTTPPath),
              )
            )
          }

          if (imgProps.includes('width')) {
            properties.push(
              t.objectProperty(
                t.identifier('width'),
                t.numericLiteral(dimensions.width),
              )
            )
          }

          if (imgProps.includes('widthPx')) {
            properties.push(
              t.objectProperty(
                t.identifier('widthPx'),
                t.stringLiteral(`${dimensions.width}px`),
              )
            )
          }

          if (imgProps.includes('height')) {
            properties.push(
              t.objectProperty(
                t.identifier('height'),
                t.numericLiteral(dimensions.height),
              )
            )
          }

          if (imgProps.includes('heightPx')) {
            properties.push(
              t.objectProperty(
                t.identifier('heightPx'),
                t.stringLiteral(`${dimensions.height}px`),
              )
            )
          }

          if (imgProps.includes('aspectRatio')) {
            properties.push(
              t.objectProperty(
                t.identifier('aspectRatio'),
                t.numericLiteral(dimensions.height / dimensions.width),
              )
            )
          }

          if (imgProps.includes('hash')) {
            properties.push(
              t.objectProperty(
                t.identifier('hash'),
                t.stringLiteral(md5sum),
              )
            )
          }

          if (imgProps.includes('data') && stats.size <= limit) {
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
