/**
 * @type {import("eslint").Linter.Config}
 * ESLint の設定ファイル。TypeScript 用のルールを含めてカスタマイズしている。
 */
const config = {
  // TypeScript の構文解析を行うパーサー
  parser: "@typescript-eslint/parser",

  parserOptions: {
    // `tsconfig.json` を元に ESLint を適用する
    project: true,
  },

  // 使用する ESLint プラグイン
  plugins: ["@typescript-eslint"],

  // 基本ルールセットを拡張
  extends: [
    // Expo の推奨 ESLint 設定
    "expo",
    // JavaScript 向けの推奨設定
    "eslint:recommended",
    // TypeScript の型チェックを含む推奨設定
    "plugin:@typescript-eslint/recommended-type-checked",
    // TypeScript のコードスタイルを厳密にするルールセット
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],

  // カスタムルールの設定
  rules: {
    // 配列の型定義 (`Array<T>` or `T[]`) を強制しない
    "@typescript-eslint/array-type": "off",

    // `type` or `interface` の使用を統一しない
    "@typescript-eslint/consistent-type-definitions": "off",

    // `import type { T } from "module";` のスタイルを推奨
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports", // `import type` を優先
        fixStyle: "inline-type-imports", // インラインで `type` を指定
      },
    ],

    // 未使用の変数に警告。ただし、`_` で始まる変数は許容
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

    // `async` 関数の中で `await` を必須にしない
    "@typescript-eslint/require-await": "off",

    // `Promise<void>` を返す関数を `onPress` などに直接渡せるようにする
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: { attributes: false },
      },
    ],

    // `require()` の使用を許可
    "@typescript-eslint/no-var-requires": "off",
  },

  // ESLint のチェック対象から除外するファイル
  ignorePatterns: [
    "babel.config.js", // Babel の設定ファイル
    // 'metro.config.js'  // Metro バンドラーの設定ファイル（コメントアウト）
  ],
};

module.exports = config;
