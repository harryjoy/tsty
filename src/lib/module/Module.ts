import * as _ from "lodash";
import * as Helpers from "../../components/utils/Helpers";
import Events from "../../components/events/Events";
import DependantModule from "./DependantModule";
import ModuleConfig from "./ModuleConfig";
import Logger from "../../components/logs/Logger";
import { AppDatabase } from "../../components/database/Database";
import { IDbModel } from "../../components/database/IDbModel";
import { IConfig } from "../config/IConfig";
import { application } from "../../index";

export default class Module {
    events: Events;
    dependantModule: DependantModule;
    name: string;
    config: IConfig;

    private models: Array<IDbModel>;

    constructor(name: string) {
        this.dependantModule = application.modules.findModule(name);
        if (!this.dependantModule) {
            application.modules.dumpToConsole();
            throw "Not able to find module with name " + name + ". Please make sure its loaded.";
        }
        this.name = Helpers.lowerCaseFirstLetter(this.dependantModule.name);
        this.events = new Events(this.name);
        this.config = application.config;
        this.models  = [];
    }

    register(cb: Function) {
        application.register(this.name, cb);
    }

    addDbModel(model: IDbModel): Module {
        if (!model.db && (!model.dbs || model.dbs.length === 0)) {
            model.dbs = [ModuleConfig.DEFAULT_DB_NAME];
        } else if (model.db && (!model.dbs || model.dbs.length === 0)) {
            model.dbs = [model.db];
        }
        this.models.push(model);
        return this;
    }

    buildDbModels(database: AppDatabase<any, IDbModel, any>, override?: boolean) {
        for (let model of this.models) {
            if (database.isModelExistInModels(model.name) && !override) {
                Logger.info("Model already exists, skipping it: " + model.name)
                continue;
            }
            database.updateModelStructure(model);
            if (model.listeners && model.listeners.length > 0) {
                database.bindModelListeners(model, model.listeners);
            }
            let dbModels = database.registerModel(model);
            dbModels.forEach((dbModel, i: number) => {
                database.registerModelPostSteps(model.name, dbModel);
                this.events.emit(ModuleConfig.DB_MODEL_READY_EVENT, {
                    model: dbModel,
                    db: model.dbs[i]
                });
            });
        }
        this.events.emit(ModuleConfig.DB_MODELS_READY_EVENT);
    }

    addRoute(routePath: string, args: Array<any>): Module {
        return this.addRoutes([routePath], args);
    }

    addRoutes(routePaths: Array<string>, args: Array<any>): Module {
        routePaths.forEach((path: string) => {
            if (require(path).routes) {
                require(path).routes.apply(this, args);
            } else {
                require(path).default.apply(this, args);
            }
        });
        return this;
    }

    addRouteFunc(routeFunc: Function, args: Array<any>): Module {
        routeFunc.apply(this, args);
        return this;
    }
}
