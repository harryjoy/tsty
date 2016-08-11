import * as _ from "lodash";
import * as Promise from "bluebird";
import * as Types from "../types/Types";
import { IDbModel } from "./IDbModel";

export abstract class AppDatabase<T, U extends IDbModel, Z> {
    protected models: Types.Map;
    protected options: any;

    private dbConnection: T;

    constructor(protected url: string, protected prefix: string, options?) {
        if (options) {
            this.options = _.merge(this.options, options);
        } else {
            this.options = {};
        }
        this.reset();
    }

    get connection(): T {
        return this.dbConnection;
    };

    set connection(connection: T) {
        this.dbConnection = connection;
    };

    reset() {
        this.connection = null;
        this.models = {};
    }

    abstract connect(): Promise<{}>;
    abstract disconnect(): Promise<{}>;
    abstract isConnected(): boolean;
    abstract listen(name: string, cb: Function): void | any;
    abstract updateModelStructure(model: U);
    abstract bindModelListeners(modelData: U, listeners: Array<Types.Listener>);
    abstract registerModel(modelData: U): Array<Z>;

    registerModelPostSteps(key: string, model: Z) {
        Promise.promisifyAll(model);
        Promise.promisifyAll(model["prototype"]);
        this.models[key] = model;
    }

    isModelExistInModels(key: string): boolean {
        return !!this.models[key];
    }

    getModel(key: string): Z {
        return this.models[key];
    }
}
