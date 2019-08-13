# babel-plugin-imagehelper

Load image information (width, height, aspectRatio and path) into variable so that all the information is accessible to your app.

# Installation
`$ npm install babel-plugin-imagehelper`

# Usage

Add the plugin to .babelrc. Specify the path to the image directory with `path` in options.
```
["babel-plugin-imagehelper", {
  path: path.join(__dirname, '/img'),
  httpPath: '/static',
  limit: 10000,
  hashLength: 8
  props: ['src', 'absPath', 'ext', 'width', 'widthPx', 'height', 'heightPx', 'aspectRatio', 'hash', 'data']
}]
```

In the source code any variable with the string value `__babelPluginImageHelper__` will be replace with an associative array with information about the images in the directory your specified for the plugin in .babelrc.

# Options
* **path**: (required) Path to directory with images
* **httpPath**: HTTP path to the image for the src attribute in HTML img tag
* **limit**: Byte limit to inline files as Data URL (inspired by webpack url-loader). Set to 0 to disable.
* **hashLength**: md5sum length for cache busting
* **props**: Selects which properties that will be included for each image. If omitted, all the properties will be included.

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
  'img.jpg': {
    path: "/Users/erikfossvold/Development/npm_pkgs/babel-plugin-imagehelper/img/img.jpg",
    ext: ".jpg",
    src: "/static/img.jpg",
    width: 1200,
    widthPx: "1200px",
    height: 630,
    heightPx: "630px",
    aspectRatio: 0.525,
    hash: "8556baa0"
  },
  'img.png': {
    path: "/Users/erikfossvold/Development/npm_pkgs/babel-plugin-imagehelper/img/img.png",
    ext: ".png",
    src: "/static/img.png",
    width: 455,
    widthPx: "455px",
    height: 454,
    heightPx: "454px",
    aspectRatio: 0.9978021978021978,
    hash: "80050422"
  },
  'img.svg': {
    path: "/Users/erikfossvold/Development/npm_pkgs/babel-plugin-imagehelper/img/img.svg",
    ext: ".svg",
    src: "/static/img.svg",
    width: 580,
    widthPx: "580px",
    height: 580,
    heightPx: "580px",
    aspectRatio: 1,
    hash: "f1472623",
    data: "PHN2ZyB2aWV3Qm94PSIwIDAgNTgwIDU4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIGhlaWdodD0iNTgwIiByeD0iMjkwIiB3aWR0aD0iNTgwIi8+PG1hc2sgaWQ9ImIiIGZpbGw9IiNmZmYiPjx1c2UgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiB4bGluazpocmVmPSIjYSIvPjwvbWFzaz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiM0ZTZmODIiIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3QgZmlsbD0iI2QyZGZlNyIgaGVpZ2h0PSI0NjkiIG1hc2s9InVybCgjYikiIHJ4PSIxMCIgdHJhbnNmb3JtPSJtYXRyaXgoLjk4NDgwNzc1IC4xNzM2NDgxOCAtLjE3MzY0ODE4IC45ODQ4MDc3NSA3NC42MjY4MzkgLTQ5Ljk4ODY3NCkiIHdpZHRoPSIzMDAiIHg9IjE3MyIgeT0iMTY3Ii8+PHJlY3QgZmlsbD0iI2ZmZiIgaGVpZ2h0PSI0NjkiIG1hc2s9InVybCgjYikiIHJ4PSIxMCIgd2lkdGg9IjMwMCIgeD0iMTQwIiB5PSIxNDMiLz48ZyBmaWxsPSIjNGU2ZjgyIj48cmVjdCBoZWlnaHQ9IjEwIiBtYXNrPSJ1cmwoI2IpIiByeD0iNSIgd2lkdGg9IjIyMCIgeD0iMTgwIiB5PSI0MzAiLz48cmVjdCBoZWlnaHQ9IjYiIG1hc2s9InVybCgjYikiIHJ4PSIzIiB3aWR0aD0iMjA3IiB4PSIxODAiIHk9IjQ1OCIvPjxyZWN0IGhlaWdodD0iNiIgbWFzaz0idXJsKCNiKSIgcng9IjMiIHdpZHRoPSIyMTQiIHg9IjE4MCIgeT0iNDc0Ii8+PHJlY3QgaGVpZ2h0PSI2IiBtYXNrPSJ1cmwoI2IpIiByeD0iMyIgd2lkdGg9IjIwOSIgeD0iMTgwIiB5PSI0OTAiLz48cmVjdCBoZWlnaHQ9IjYiIG1hc2s9InVybCgjYikiIHJ4PSIzIiB3aWR0aD0iMTk0IiB4PSIxODAiIHk9IjUwNiIvPjxyZWN0IGhlaWdodD0iNiIgbWFzaz0idXJsKCNiKSIgcng9IjMiIHdpZHRoPSIyMDciIHg9IjE4MCIgeT0iNTIyIi8+PC9nPjx0ZXh0IGZpbGw9IiNmZjM5NzMiIGZvbnQtZmFtaWx5PSJOdW5pdG8tQmxhY2ssIE51bml0byIgZm9udC1zaXplPSIxNDQiIGZvbnQtd2VpZ2h0PSI3MDAiIG1hc2s9InVybCgjYikiPjx0c3BhbiB4PSIxNjAiIHk9IjM0OSI+NDA0PC90c3Bhbj48L3RleHQ+PHRleHQgZmlsbD0iIzRlNmY4MiIgZm9udC1mYW1pbHk9Ik9wZW5TYW5zLVNlbWlib2xkLCBPcGVuIFNhbnMiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSI1MDAiIG1hc2s9InVybCgjYikiPjx0c3BhbiB4PSIxNjAiIHk9IjIyNyI+UkVQT1JUPC90c3Bhbj48L3RleHQ+PC9nPjwvc3ZnPg=="
  },
  'subdir/img.jpg': {
    path: "/Users/erikfossvold/Development/npm_pkgs/babel-plugin-imagehelper/img/subdir/img.jpg",
    ext: ".jpg",
    src: "/static/subdir/img.jpg",
    width: 1200,
    widthPx: "1200px",
    height: 630,
    heightPx: "630px",
    aspectRatio: 0.525,
    hash: "8556baa0"
  }
};
```
