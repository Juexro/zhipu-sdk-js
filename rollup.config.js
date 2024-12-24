const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser')

module.exports = [
  {
    input: './src/index.ts',
    external: id => id != "tslib" && !/^(\.?\/|\w:)/.test(id),
    output: [
      {
        dir: 'lib',
        format: 'cjs',
        entryFileNames: '[name].js',
        sourcemap: false,
      },
      {
        dir: 'lib',
        format: 'es',
        entryFileNames: '[name].esm.js',
        sourcemap: false,
      },
      {
        dir: 'lib',
        format: 'umd',
        entryFileNames: '[name].umd.js',
        name: 'ZhipuSDK',
        sourcemap: false,
        plugins: [terser()],
      },
    ],
    plugins: [resolve(), commonjs(), typescript({ module: "ESNext" })],
  }
];
