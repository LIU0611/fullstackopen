import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs", globals: globals.node}}, // Use `globals.node` to include Node.js globals
  pluginJs.configs.recommended,
];
