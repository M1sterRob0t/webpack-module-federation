import type { Configuration } from "webpack";
import { BuildOPtions } from "./types";

export function buildResolvers(options: BuildOPtions): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            "@": options.paths.src,
        }
    }
}