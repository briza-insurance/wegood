import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

const libraryName = 'wegood'
const input = './src/index.ts'
const extensions = ['.js', '.ts']
const plugins = [
  resolve({ extensions }),
  commonjs(),
  babel({
    extensions,
    babelHelpers: 'bundled',
    exclude: 'node_modules/**'
  })
]

export default
{
  input,
  output: [
    {
      file: './lib/' + libraryName + '.esm.js',
      format: 'esm'
    },
    {
      file: './lib/' + libraryName + '.js',
      format: 'cjs',
      exports: 'named'
    }
  ],
  plugins
}
