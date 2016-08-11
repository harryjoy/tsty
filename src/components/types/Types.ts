import * as Promise from "bluebird";
import Application from "../../lib/awts";
import { AppDatabase } from "../database/Database";

interface DatabaseConnectionOptions {
    url: string,
    prefix: string,
    options?: Object
}

export type Map = { [key: string]: number } | { [key: string]: string } | { [key: string]: any };
export type Listener = (name: string, cb: Function) => void;
export type Resolver = Promise.Resolver<{}>;
export type StringFuncObject = string | Function | Object;
export type Application = Application;
export type AppDatabase = AppDatabase<any, any, any>;
export type DbConnOptions = DatabaseConnectionOptions;
