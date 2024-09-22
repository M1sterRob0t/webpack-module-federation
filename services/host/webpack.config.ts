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
    SHOP_REMOTE_URL: string;
    ABOUT_REMOTE_URL: string;
    GALLERY_REMOTE_URL: string;
}

export default (env: EnvVariables) => {
    const buildPath: BuildPath = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src'),
    }

    const config = buildWebpack({
        mode: env.mode ?? 'development', 
        paths: buildPath,
        port: 3000,
        analyzer: env.analizer,
        platform: env.platform ?? 'desktop',
    });

    const ABOUT_REMOTE_URL = env.ABOUT_REMOTE_URL ?? 'http://localhost:3001';
    const GALLERY_REMOTE_URL = env.GALLERY_REMOTE_URL ?? 'http://localhost:3002';
    const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3003';

    config.plugins.push(new ModuleFederationPlugin ({
        name: 'host',
        filename: 'remoteEntry.js',
        remotes: {
            about: `about@${ABOUT_REMOTE_URL}/remoteEntry.js`,
            gallery: `gallery@${GALLERY_REMOTE_URL}/remoteEntry.js`,
            shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
        },
        shared: {
            ...packageJson.dependencies,
            'react': {
                eager: true,
                // requiredVersion: packageJson.dependencies['react']
            },
            'react-router-dom': {
                eager: true,
                // requiredVersion: packageJson.dependencies['react-router-dom']
            },
            'react-dom': {
                eager: true,
                // requiredVersion: packageJson.dependencies['react-dom']
            },
        }
    }))

 
    return config;
}