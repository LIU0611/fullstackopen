module.exports = {
  "env": {
    "commonjs": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@stylistic/js/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
    "@stylistic/js/indent": [
      "error",
      2
    ],
    "@stylistic/js/linebreak-style": [
      "error",
      "unix"
    ],
    "@stylistic/js/quotes": [
      "error",
      "single"
    ],
    "@stylistic/js/semi": [
      "error",
      "never"
    ],
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
      "error", "always"
    ],
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ],
    "no-console": 0,
    "no-undef": 0
  },
  "ignorePatterns": ["dist/**", "node_modules/**"]
};
