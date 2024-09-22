import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOPtions } from "./types";

export function buildDevServer({ port }: BuildOPtions): DevServerConfiguration {
    return {
        open: true,
        port: port ?? 3000,
        historyApiFallback: true,
        hot: true,
    };
}