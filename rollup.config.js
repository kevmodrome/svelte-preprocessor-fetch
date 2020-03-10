import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

const dev = process.env.NODE_ENV !== "production";

export default {
  input: "./src/index.js",
  external: ["path", "node-sass"],
  plugins: [resolve(), babel()],
  output: [
    {
      file: "./dist/index.js",
      format: "cjs",
      sourcemap: dev
    },
    {
      file: "./dist/module.js",
      format: "es",
      sourcemap: dev
    }
  ]
};
