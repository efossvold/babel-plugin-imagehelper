# babel-plugin-imagehelper

Load image information (width, height, aspectRatio and path) into variable so that all the information is accessible to your app.

# Installation
`$ npm install babel-plugin-imagehelper`

# Usage

Add the plugin to .babelrc. Specify the path to the image directory with `path` in options.
`["babel-plugin-imagehelper", {
  path: './static/i',
  limit: 10000,
  hashLength: 8
}]`

In the source code any variable with the string value `__babelPluginImageHelper__` will be replace with an associative array with information about the images in the directory your specified for the plugin in .babelrc.

# Options
* path: (required) Path to directory with images
* limit: Byte limit to inline files as Data URL (inspired by webpack url-loader). Set to 0 to disable.
* hashLength: md5sum length for cache busting

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
```
