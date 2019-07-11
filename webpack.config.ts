import { BannerPlugin } from 'webpack';
// @ts-ignore
import TerserPlugin from 'terser-webpack-plugin';
import { join } from 'path';
import { readFileSync } from 'fs';

import mergeWith from 'lodash.mergewith';

export default (env: any) => {
  let config = {
    context: __dirname,
    entry: {
      'destiny2-lfg-reports.user': './destiny2-lfg-reports.user.ts'
    },
    output: {
      crossOriginLoading: 'anonymous',
      filename: '[name].js',
      path: __dirname
    },
    mode: 'development',
    devtool: 'none',
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
      minimizer: []
    }
  }

  if(env === 'production') {
    mergeWith(config, {
      mode: 'production',
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
    }, (objVal: any, srcVal: any) => {
      if(Array.isArray(objVal)) {
        return objVal.concat(srcVal);
      }
      return;
    });
  }

  return config;
}