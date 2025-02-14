import type { Configuration } from "webpack";
import { BuildOPtions } from "./types";

import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from "./buildResolvers";

export function buildWebpack(options: BuildOPtions): Configuration {
    const {mode, paths} = options;
    const isDev = mode === 'development';

    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: 'bundle.[contenthash].js',
            chunkFilename: 'chunk.[contenthash].js',
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'eval-cheap-module-source-map' : false,
        devServer: isDev ? buildDevServer(options) : undefined,       
    };
}