// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("@angular-eslint/eslint-plugin");
const angularTemplate = require("@angular-eslint/eslint-plugin-template");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    plugins: {
      "@angular-eslint": angular,
    },
    rules: {
      "@angular-eslint/directive-selector": "error",
      "@angular-eslint/component-selector": "error",
      "@angular-eslint/no-output-on-prefix": "error",
      "@angular-eslint/use-lifecycle-interface": "warn",
      "@angular-eslint/prefer-output-readonly": "error",
      "@angular-eslint/no-conflicting-lifecycle": "error",
      "@angular-eslint/no-host-metadata-property": "error",
      "@angular-eslint/no-input-rename": "error",
      "@angular-eslint/no-output-rename": "error",
      "@angular-eslint/use-track-by-function": "error",
      "@angular-eslint/consistent-component-styles": "error",
      "@angular-eslint/consistent-interactive-element-focus": "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angularTemplate.configs["flat/recommended"],
    ],
    plugins: {
      "@angular-eslint/template": angularTemplate,
    },
    rules: {
      "@angular-eslint/template/click-events-have-key-events": "warn",
      "@angular-eslint/template/mouse-events-have-key-events": "warn",
      "@angular-eslint/template/no-autofocus": "warn",
    },
  }
);
