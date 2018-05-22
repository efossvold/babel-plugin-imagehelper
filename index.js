const nodePath = require('path')
const glob = require('glob-fs')()
const imageSize = require('image-size')
const pluginName = 'babel-plugin-image-size'

module.exports = function(babel) {
  const t = babel.types
  return {
    visitor: {
      StringLiteral: function StringLiteral(path, state) {
        if (path.node.value !== '__babelPluginImageHelper__') return

        const imgDir = nodePath.join('.', state.opts.path)
        let files = glob.readdirSync(nodePath.join(imgDir, '**/*.{jpg,jpeg,png,gif,svg}'))

        // For some reason glob sometimes duplicates all file entries. Remove them with Set.
        files = Array.from(new Set(files))

        const nodes = files.map(imgPath => {
          let dimensions

          try {
            dimensions = imageSize(imgPath)
          } catch(e) {
            console.log(`${pluginName}: ${e} (${imgPath})`)
            return
          }

          const imgAbsPath = nodePath.join('.', imgPath)
          const key = nodePath.relative(imgDir, imgAbsPath)

          return t.objectProperty(
            t.identifier(`'${key}'`),
            t.objectExpression([
              t.objectProperty(
                t.identifier('path'),
                t.stringLiteral(imgPath),
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
            ])
          )
        })

        path.replaceWith(t.objectExpression(nodes))
      },
    }
  }
}
