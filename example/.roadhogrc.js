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
  "define": {
    "__ENV__": __ENV__,
    "__VERSION__": __VERSION__
  },
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": "css" }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": "css" }]
      ]
    }
  },
  "proxy":{
    // "/api/v1/*": {
    //     "target": "//test-xteach.class100.com",
    //     //"target": "http://192.168.102.209:13333",
    //     "changeOrigin": true,
    //     "secure":false
    // },
    "/ws": {
      "target": "http://localhost:8080",
      // "target": "http://192.168.102.220:13333",
      "changeOrigin": true,
      "ws": true
    }
  }
}
if (Dose) {
  config.outputPath = '../docs';
}
export default config;
