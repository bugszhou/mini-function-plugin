const traverse = require("@babel/traverse").default,
  generate = require("babel-generator").default,
  parse = require("@babel/parser").parse;

module.exports = function transformCodeFn(sourceCode) {
  const ast = parse(sourceCode);
  traverse(ast, {
    enter: (path) => {
      if (path.isIdentifier({ name: "Function" })) {
        path.node.name = "Function.MiniFunction";
      }
    }
  });
  return generate(ast, {
    sourceMaps: true,
    minified: process.env.NODE_ENV !== "development",
  }).code;
}
