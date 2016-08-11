import * as Types from "../../components/types/Types";

export interface IFramework {
    name: string,
    version: string
}

export interface IHttpConfig {
    port: number;
}

export interface IHttpsConfig {
    port: number;
    key?: string;
    cert?: string;
    ca?: string;
}

export interface IDbConfig {
    url: string,
    prefix: string,
    options: {
        debug: boolean
    },
    dbOption: Object,
    dbs: Array<string>
}

export interface IUrlMappings {
    modules: string,
    allModules: string;
    framework: string
}

export interface IConfig {
    [key: string]: any;
    putExtra(key: string, value: any, override?: boolean): boolean;
    getExtra(key: string): any;

    name?: string;
    secret?: string;

    credentialsRequired?: boolean;
    serverEngine?: string;
    framework: IFramework;

    http?: IHttpConfig;
    https?: IHttpsConfig;

    db?: string;
    dbOptions?: IDbConfig;

    url?: IUrlMappings;

    disabledModules?: Array<string>;
    modulePaths?: Array<string>;

    packageJson?: string;
    moduleNameInPackageJson?: string;
    moduleAppFileNameInPackageJson?: string;
    moduleDependenciesInPackageJson?: string;
}
