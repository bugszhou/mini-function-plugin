const esprima = require('esprima'),
  estraverse = require('estraverse'),
  escodegen = require('escodegen');

module.exports = function transformCodeFn(sourceCode) {
  const ast = esprima.parseScript(sourceCode);
  estraverse.traverse(ast, {
    enter: (node) => {
      if (node.type === 'Identifier' && node.name === 'Function') {
        node.name = "global.MiniFunction";
      }
    }
  });
  const transformCode = escodegen.generate(ast, {
    format: {
      ...escodegen.FORMAT_MINIFY,
      semicolons: true,
    }
  });
  return transformCode;
}
