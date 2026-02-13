import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/ha-dashboard-cards.js",
    format: "iife",
    sourcemap: false,
  },
  plugins: [
    resolve(),
    typescript(),
    terser({
      output: {
        comments: false,
      },
    }),
  ],
};
