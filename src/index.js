const transformCodeFn = require("./utils/change");

class MiniFunctionPlugin {

  apply(compiler) {

    compiler.hooks.emit.tap(
      'mini-function-plugin-emit',
      (compilation) => {
        const { assets } = compilation || {};

        Object.keys(assets).forEach((pathurl) => {
          if (/\.js$/.test(pathurl)) {
            if (assets[pathurl]._value) {
                assets[pathurl]._value = transformCodeFn(assets[pathurl]._value);
            } else {
              if (assets[pathurl].children && Array.isArray(assets[pathurl].children)) {
                const children = assets[pathurl].children;
                if (Array.isArray(children)) {
                  assets[pathurl].children = children.map(item => {
                    if (item._value) {
                      item._value = transformCodeFn(item._value);
                    }
                    return item;
                  })
                }
              }
            }
          }
        });
      });
  }
}

module.exports = MiniFunctionPlugin;
