# babel-plugin-imagehelper

Load image information (width, height, aspectRatio and path) into variable so that all the information is accessible to your app.

# Installation
`$ npm install babel-plugin-imagehelper`

# Usage

Add the plugin to .babelrc. Specify the path to the image directory with `path` in options.
`["babel-plugin-imagehelper", {path: './static/i'}]`

In the source code any variable with the string value `__babelPluginImageHelper__` will be replace with an associative array with information about the images in the directory your specified for the plugin in .babelrc.

# Example
Say you have 4 image files in the `./static/i` directory:
* img1.jpg
* img2.png
* img3.svg
* subdir/img.jpg

And a file in your source code named `images.js`:

```
// images.js
// Transformed by babel-plugin-imagehelper
export const images = '__babelPluginImageHelper__'
```

Using the plugin `images.js` becomes:
```
// images.js
export default {
  'img1.jpg': {
    path: "img/img.jpg",
    width: 1200,
    widthPx: "1200px",
    height: 630,
    heightPx: "630px",
    aspectRatio: 0.525
  },
  'img2.png': {
    path: "img/img.png",
    width: 455,
    widthPx: "455px",
    height: 454,
    heightPx: "454px",
    aspectRatio: 0.9978021978021978
  },
  'img3.svg': {
    path: "img/img.svg",
    width: 580,
    widthPx: "580px",
    height: 580,
    heightPx: "580px",
    aspectRatio: 1
  },
  'subdir/img.jpg': {
    path: "img/subdir/img.jpg",
    width: 1200,
    widthPx: "1200px",
    height: 630,
    heightPx: "630px",
    aspectRatio: 0.525
  }
};
```
