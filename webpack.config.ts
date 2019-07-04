import { BannerPlugin } from 'webpack';
// @ts-ignore
import TerserPlugin from 'terser-webpack-plugin';
import { join } from 'path';
import { readFileSync } from 'fs';

export default () => {
  return {
    context: __dirname,
    entry: {
      'destiny2-lfg-reports.user': './destiny2-lfg-reports.user.ts'
    },
    output: {
      crossOriginLoading: 'anonymous',
      filename: '[name].js',
      path: __dirname
    },
    mode: 'production',
    target: 'web',
    resolve: {
      extensions: [ '.ts', '.js', '.json' ]
    },
    module: {
      rules: [
        {
          test: /\.ts$/i,
          use: [ 'ts-loader' ]
        }
      ]
    },
    plugins: [
      new BannerPlugin({
        entryOnly: true,
        raw: true,
        banner: readFileSync(join(__dirname, 'userscript-banner.txt'), { encoding: 'utf-8', flag: 'r' })
      })
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          cache: true,
          parallel: true,
          extractComments: {
            condition: (_ast: any, comment: any) => !(/^\s[@=].+/i.test(comment.value)),
            filename: 'node_modules/.cache/garbage',
            banner: false
          },
          terserOptions: {
            output: {
              comments: /\s[@=].*/i
            }
          }
        })
      ]
    }
  }
}