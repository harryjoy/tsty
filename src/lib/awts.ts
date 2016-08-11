import * as _ from "lodash";
import * as util from "util";
import * as express from "express";
import * as Promise from "bluebird";
import * as LazyDependable from "lazy-dependable";
import * as Types from "../components/types/Types";
import Logger from "../components/logs/Logger";
import AppInitializer from "../components/intializer/ApplicationInitializer";
import AppConfig from "./config/AppConfig";
import ConfigBuilder from "./config/ConfigBuilder";
import ModuleList from "./module/ModuleList";
import { IConfig } from "./config/IConfig";
import { ServerHandler } from "./app/ServerHandler";

interface IAppStatus {
    version: string;
    name: string;
    active: boolean;
}

interface IExportableModule {
    name: string;
    version?: string;
}

export default class Application {
    active: boolean = false;
    options: any;

    app: express.Express;
    config: IConfig;

    modules: ModuleList = new ModuleList();
    exportableModules: Array<IExportableModule>;

    // START: signatures of lazy-dependable container methods
    register: (name: Types.StringFuncObject, cb?: Function | any) => void;
    resolve: (name: Types.StringFuncObject, cb?: Function) => void;
    get: (name: string, cb: Function) => void;
    destroy: () => void;
    resolved: Types.Map;
    // END: signatures of lazy-dependable container methods

    serve: (options: any, cb?: (application: Application) => void) => void;

    constructor(private initializer: AppInitializer, private configBuilder: ConfigBuilder) {
        LazyDependable.Container.call(this);
        this.exportableModules = [];
        this.serve = ServerHandler.startServer.bind(ServerHandler, this);
    }

    get version(): string {
        return this.config.framework.version;
    }

    get name(): string {
        return this.config.framework.name;
    }

    get status(): IAppStatus {
        return {
            name: this.name,
            version: this.version,
            active: this.active
        };
    }

    executeInitializers(): Promise<void> {
        return this.initializer.initialize(this).then((result) => {
            Logger.info("Application initialization complete");
        }).catch((err) => {
            Logger.error("err", err);
        });
    }

    buildConfiguration(): Promise<void> {
        return this.configBuilder.build().then((config: AppConfig) => {
            this.config = config;
        });
    }
}

util.inherits(Application, LazyDependable.Container);
