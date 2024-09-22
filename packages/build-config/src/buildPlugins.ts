import path from 'path';
import webpack from 'webpack';
import type { Configuration } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import BundleAnalyzer from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from "copy-webpack-plugin";

import type { BuildOPtions } from "./types";

export function buildPlugins({mode, paths, analyzer, platform}: BuildOPtions): Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({template: paths.html, favicon: path.resolve(paths.public, 'favicon.ico')}),
        new webpack.DefinePlugin({
            __PLATFORM__: JSON.stringify(platform),
        })
    ];

    if (isDev) {
        /* plugins.push(
            // new ForkTsCheckerWebpackPlugin(), // выносит проверку типов в отдельный процесс (и вебпак быстрее собирается)
            // new ReactRefreshWebpackPlugin()
        ); */
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({filename: 'main.[contenthash].css'}), // выносит css в отдельный файл (иначе он собирается в bundle.js)
            new webpack.ProgressPlugin(), // показывает прогресс сборки (но замедляет сборку)
            new CopyPlugin({
                patterns: [
                  { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
                ],
            }),
        );
    }

    if (analyzer) {
        plugins.push(
            new BundleAnalyzer.BundleAnalyzerPlugin() // показывает размер файлов сборки в отдельном окне
        );
    }

    return plugins;
}