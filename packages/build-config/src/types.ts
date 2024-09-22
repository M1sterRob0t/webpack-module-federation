export type BuildMode = 'production' | 'development';
export type BuildPlatform = 'desktop' | 'mobile';

export type BuildPath = {
    entry: string;
    html: string;
    output: string;
    src: string;
    public: string;
};

export type BuildOPtions = {
    mode: BuildMode,
    port: number,
    paths: BuildPath,
    analyzer?: boolean;
    platform?: BuildPlatform;
};