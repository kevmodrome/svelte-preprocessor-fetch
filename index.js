const fetch = require("node-fetch");
const acorn = require("acorn");
const walk = require("acorn-walk");

export default function getStaticProps(options) {
  return {
    async script({ content }) {
      const tree = acorn.parse(content, { sourceType: "module" });
      let start, end;

      walk.simple(tree, {
        FunctionDeclaration(node) {
          if (node.id.name === "getStaticProps") {
            start = node.body.start;
            end = node.body.end;
          }
        }
      });

      if (!start) return { code: content };

      const code = content.slice(start, end);

      const data = await eval("(async () => {" + code + "})()");

      return { code: insert_data(data, content) };
    }
  };
}

function insert_data(data, content) {
  var newContent = "const data = " + JSON.stringify(data) + ";" + content;
  return newContent;
}
