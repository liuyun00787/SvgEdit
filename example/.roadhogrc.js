const __VERSION__ = require('./package.json').version;
let __ENV__ = 'develop';
let Dose = false;
try {
  const argv = process.argv[2] || '';
  const a = argv.split('=');
  if (a[1] === 'develop') {
    __ENV__ = 'develop';
  }
  if (a[1] === 'hx') {
    __ENV__ = 'hx';
  }
  if (a[1] === 'qa') {
    __ENV__ = 'qa';
  }
  if (a[1] === 'test') {
    __ENV__ = 'test';
  }
  if (a[1] === 'production') {
    __ENV__ = 'production';
  }
  if (a[1] === 'docs') {
    Dose = true;
    __ENV__ = 'production';
  }
} catch (e) {
  console.log(e);
  __ENV__ = 'develop';
}
console.log('------------------------------------------');
console.log('------------------------------------------');
console.log('');
console.log('__ENV__: ', __ENV__, '&&', '__VERSION__: ', __VERSION__);
console.log('');
console.log('------------------------------------------');
console.log('------------------------------------------');

const config = {
  "entry": "src/index.js",
  // "hash": true,
  "extraBabelIncludes": [
    "../src/",
    "../lib/"
  ],
  "define": {
    "__ENV__": __ENV__,
    "__VERSION__": __VERSION__
  },
  "env": {
    "development": {
      "extraBabelPlugins": [
        // "dva-hmr",
        "transform-runtime",
        // ["import", { "libraryName": "antd", "style": "css" }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        // ["import", { "libraryName": "antd", "style": "css" }]
      ]
    }
  }
}
if (Dose) {
  config.publicPath = './';
  config.outputPath = '../docs';
}
export default config;
