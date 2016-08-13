import * as Promise from "bluebird";
import * as express from "express";
import * as Types from "../../components/types/Types";
import StaticLogger from "../../components/logs/StaticLogger";
import ModuleNames from "../config/ModuleNames";
import DependantModule from "../module/DependantModule";
import ModulesLoader from "../module/ModulesLoader";
import { IConfig } from "../config/IConfig";
import { IAppInitializer } from "../../components/intializer/IAppInitializer";

export default class ModuleInitializer implements IAppInitializer {
    private application: Types.Application;
    private config: IConfig;
    private moduleLoader: ModulesLoader;

    initialize(application: Types.Application): Promise<{}> {
        this.application = application;
        this.config = this.application.config;
        this.moduleLoader = new ModulesLoader(this.config.packageJson,
            this.config.moduleNameInPackageJson,
            this.config.moduleAppFileNameInPackageJson,
            this.config.moduleDependenciesInPackageJson);
        const defer = Promise.defer();
        this.application.resolve(ModuleNames.EXPRESS_APP_MODULE, this.bootstrapModules.bind(this, defer));
        return defer.promise;
    }

    private bootstrapModules(defer: Types.Resolver, app: express.Express): Promise<{}> {
        const disabledModules = this.config.disabledModules;
        let modulesToLoad: Array<string> = this.config.modulePaths;
        if (modulesToLoad.indexOf("node_modules") === -1) {
            modulesToLoad.push("node_modules");
        }
        let promises: Array<Promise<{}>> = [];
        if (modulesToLoad && modulesToLoad.length > 0) {
            modulesToLoad.forEach((path) => {
                promises.push(this.moduleLoader.loadModule(this.application.modules, disabledModules, path));
            });
        }
        return Promise.all(promises)
        .then(this.allModulesLoaded.bind(this, app, defer))
        .catch((error) => {
            StaticLogger.error("Error while loading modules: " + error);
            defer.resolve(false);
        });
    }

    private allModulesLoaded(app: express.Express, defer: Types.Resolver) {
        app.use(this.config.url.modules, (req: express.Request, res: express.Response) => {
            res.json(this.application.exportableModules);
        });
        app.use(this.config.url.allModules, (req: express.Request, res: express.Response) => {
            res.json(Object.keys(this.application.resolved));
        });
        const modules = this.application.modules;
        if (!modules.unresolved.empty()) {
            throw "Can not start. There are packages with unresolved dependencies: "
                + modules.listOfUnresolved();
        }
        this.enableModules(defer);
    }

    private enableModules(defer: Types.Resolver) {
        let defers: Array<Types.Resolver> = [];
        this.application.modules.traverse(this.moduleActivator.bind(this, defers));
        Promise.all(defers).done(() => {
            this.application.modules.traverse(this.moduleRegistrator.bind(this));
            defer.resolve(true);
        });
    }

    private moduleActivator(defers: Array<Types.Resolver>, loadedModule: DependantModule) {
        if (!loadedModule) { return; }
        const defer: Types.Resolver = Promise.defer();
        defers.push(defer);
        loadedModule.load();
        this.application.resolve(loadedModule.name, defer.resolve.bind(defer));
    }

    private moduleRegistrator(loadedModule: DependantModule) {
        if (!loadedModule) { return; }
        this.application.exportableModules.push({
            name: loadedModule.name,
            version: loadedModule.version
        });
    }
}
