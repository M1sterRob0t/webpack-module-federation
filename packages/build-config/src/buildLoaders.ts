import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {BuildOPtions } from "./types";
import { ModuleOptions } from 'webpack';
import ReactRefreshTypeScript from 'react-refresh-typescript';


export function buildLoaders({ mode }: BuildOPtions): ModuleOptions['rules'] {
    const isDev = mode === 'development';

    const cssLoaderWithModules = {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            },
        },
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          cssLoaderWithModules,
          // Compiles Sass to CSS
          "sass-loader",
        ],
    };

    const tsLoader = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              /* getCustomTransformers: () => ({
                before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
              }), */
              transpileOnly: true,
            }
          }
        ]
    }

    const assetsLoader = {
        test: /\.(png|jpg)$/,
        type: 'asset/resource'
    }

    const svgLoader = {
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: {
            loader: '@svgr/webpack',
            options: {
                icon: true,
                svgoConfig: {
                    plugins: [
                        {
                            name: 'convertColors',
                            params: {
                                curentColor: true,
                            }
                        }
                    ]
                }
            }
        }, 
    }

    return [
        tsLoader,
        scssLoader,
        assetsLoader,
        svgLoader
    ];
}