import path from 'path';

import type { BuildMode, BuildPath, BuildPlatform } from '@packages/build-config';
import { buildWebpack } from '@packages/build-config';
import packageJson from './package.json'; 

const { ModuleFederationPlugin } = require('webpack').container;

interface EnvVariables {
    mode: BuildMode,
    port: number,
    analizer?: boolean,
    platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
    const buildPath: BuildPath = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        output: path.resolve(__dirname, 'build'),
        src: path.resolve(__dirname, 'src'),
        public: path.resolve(__dirname, 'public'),
    }

    const config = buildWebpack({
        mode: env.mode ?? 'development', 
        paths: buildPath,
        port: 3002,
        analyzer: env.analizer,
        platform: env.platform ?? 'desktop',
    });

    config.plugins.push(new ModuleFederationPlugin({
        name: 'gallery',
        filename: 'remoteEntry.js',
        exposes: {
            './router': './src/router/router.tsx',
        },
        shared: {
            ...packageJson.dependencies,
            'react': {
                eager: true,
                requiredVersion: packageJson.dependencies['react']
            },
            'react-router-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-router-dom']
            },
            'react-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-dom']
            },

        }
    }))

    return config;
}