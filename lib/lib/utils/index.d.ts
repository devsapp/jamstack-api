export declare function getCoreVerison(cwd: any): any;
export declare function detectUseOfLayer(functionPath?: string): boolean;
export declare function getLayerPaths(functionPath?: string): {
    functionResolvePath: string;
    layerPackagePath: string;
    layerModulesPath: string;
};
export declare function checkConfigYmlExist(ymlDirName: any, ymlName?: string): string;
