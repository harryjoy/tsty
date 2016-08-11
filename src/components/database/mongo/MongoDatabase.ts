import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as _ from "lodash";
import * as Types from "../../types/Types";
import Logger from "../../logs/Logger";
import Constants from "../Constants";
import ModuleConfig from "../../../lib/module/ModuleConfig";
import ModuleNames from "../../../lib/config/ModuleNames";
import { MongoModel } from "./MongoModel";
import { AppDatabase } from "../Database";
import { application } from "../../../index";

interface IConnectionResolver {
    uri: string;
    connection: mongoose.Connection;
    alias?: string;
}

interface IConnectionPoolEntity {
    state: string;
    value: IConnectionResolver
}

export default class MongoDatabase extends AppDatabase<mongoose.Connection, MongoModel, mongoose.Model<any>> {
    private connectionPool: Types.Map;

    constructor(url: string, prefix: string, options?) {
        super(url, prefix, options);
        mongoose.set("debug", options && options.mongoose && options.mongoose.debug);
        this.connectionPool = {};
    }

    connect(): Promise<{}> {
        const defer = Promise.defer();
        this.openNewConnection(this.url, this.options)
            .then(this.onDefaultConnectionOpen.bind(this, defer))
            .catch((err)=> {
                defer.reject(err);
            });
        return defer.promise;
    }

    disconnect(): Promise<{}> {
        const defer = Promise.defer();
        if (!this.isConnected()) {
            Logger.info("No connection is opened to close.");
            return;
        }
        this.connection.close();
        this.connection.once("disconnect", () => {
            this.reset();
            defer.resolve({
                disconnected: true
            });
        });
        this.connection.once("error", (err) => {
            defer.reject(err);
        });
        return defer.promise;
    }

    isConnected(): boolean {
        return this.getConnectionReadyState() === Constants.connStats["CONNECTED"];
    }

    listen(name: string, cb: Function) {
        this.connection.on(name, cb);
    }

    updateModelStructure(model: MongoModel) {
        model.fields = _.merge({}, model.fields);
        model.methods = _.merge({}, model.methods);
        model.statics = _.merge({}, model.statics);
    }

    bindModelListeners(model: MongoModel, listeners: Array<Types.Listener>) {
    }

    registerModel(modelData: MongoModel): Array<mongoose.Model<any>> {
        const found = this.isModelExistInModels(modelData.name);
        if (found) { return; }
        const schema = modelData.schema;
        let colllection = modelData.collection;
        if (this.prefix) {
            colllection = this.prefix + "_" + colllection;
        }
        let dbModels: Array<mongoose.Model<any>> = [];
        for (let db of modelData.dbs) {
            dbModels.push(this.createDbModel(db, modelData.name, schema, colllection));
        }
        return dbModels;
    }

    getConnectionReadyState(): number {
        return this.connection.readyState;
    }

    private onDefaultConnectionOpen(defer: Promise.Resolver<{}>, result: IConnectionResolver) {
        this.connection = result.connection;
        application.register(ModuleNames.DATABASE_MODULE, this);

        let config = application.config;
        let promises = [];
        if (config.dbOptions.dbs && config.dbOptions.dbs.length > 0) {
            for (var i in config.dbOptions.dbs) {
                promises.push(this.openNewConnection(config.dbOptions.dbs[i], _.merge(this.options || {}, {
                    alias: i
                })));
            }
        }
        Promise.all(promises).then(this.databaseReady.bind(this, defer));
    }

    private databaseReady(defer: Promise.Resolver<{}>, connectionPool: Array<IConnectionPoolEntity>) {
        for (let conn of connectionPool) {
            if (conn.state !== "fulfilled") {
                continue;
            }
            this.connectionPool[conn.value.alias] = conn.value.connection;
        }
        defer.resolve();
    }

    private openNewConnection(url: string, options?): Promise<IConnectionResolver | {}> {
        const defer = Promise.defer();
        let connection = mongoose.createConnection(url, options);
        connection.once("connected", () => {
            defer.resolve({
                uri: url,
                alias: options.alias,
                connection: connection
            });
        });
        connection.once("error", (err) => {
            defer.reject(err);
        });
        return defer.promise;
    }

    private createDbModel(alias: string, name: string, schema: mongoose.Schema, colllection: string): mongoose.Model<any> {
        let model: mongoose.Model<any>;
        if (colllection) {
            model = this.getMongoConnectionByAlias(alias).model<any>(name, schema, colllection);
        } else {
            model = this.getMongoConnectionByAlias(alias).model<any>(name, schema);
        }
        return model;
    }

    private getMongoConnectionByAlias(alias: string): mongoose.Connection {
        if (alias === ModuleConfig.DEFAULT_DB_NAME || !this.connectionPool[alias]) {
            return this.connection;
        }
        return this.connectionPool[alias];
    }

    private isConnectionOpenForAlias(alias: string): boolean {
        return (alias === ModuleConfig.DEFAULT_DB_NAME) || !!this.connectionPool[alias];
    }
}
