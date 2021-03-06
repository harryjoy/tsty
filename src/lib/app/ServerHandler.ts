import * as Promise from "bluebird";
import * as Types from "../../components/types/Types";
import StaticLogger from "../../components/logs/StaticLogger";
import DbFactory from "../../components/database/DbFactory";
import ModuleNames from "../config/ModuleNames";
import ServerEngineFactory from "../server/ServerEngineFactory";

class Handler {
    startServer(application: Types.Application, options: any, cb?: Function) {
        if (application.active) {
            cb(application);
            StaticLogger.info("Application server is already up.");
            return;
        }
        application.buildConfiguration().then(() => {
            application.active = true;
            application.options = options;
            this.connectToDbAndStartApp(application, cb);
        }).catch((err) => {
            StaticLogger.error(err);
            throw err;
        });
    }

    private connectToDbAndStartApp(application: Types.Application, cb?: Function) {
        const database = DbFactory.produceDatabaseEngine(application.config.db || "mongo", {
            url: application.config.dbOptions.url,
            prefix: application.config.dbOptions.prefix,
            options: application.config.dbOptions.options,
        });
        database.connect();

        application.resolve(ModuleNames.DATABASE_MODULE, this.startEngine.bind(null, application, cb));
    }

    private startEngine(application: Types.Application, cb: Function, database: Types.AppDatabase) {
        const serverEngine = ServerEngineFactory.produceServerEngine(application.config.serverEngine || "express");
        serverEngine.start(application, database);
        application.executeInitializers().then(() => {
            serverEngine.afterStartup(() => {
                if(cb) { cb(application); }
            });
        });
    }
}

export var ServerHandler = new Handler();
