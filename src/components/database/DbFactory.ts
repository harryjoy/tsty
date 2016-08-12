import * as Types from "../../components/types/Types";
import Logger from "../../components/logs/Logger";
import MongoDatabase from "../../components/database/mongo/MongoDatabase";
import ModuleNames from "../../lib/config/ModuleNames";
import { AppDatabase } from "../../components/database/Database";
import { application } from "../../index";

export default class DbFactory {
    private static dbs: Types.Map = {
        mongo: MongoDatabase
    };

    static registerDbEngine(name: string, dbEngine: typeof AppDatabase) {
        this.dbs[name] = dbEngine;
    }

    static produceDatabaseEngine(dbName: string, dbConnectionOptions: Types.DbConnOptions): Types.AppDatabase {
        var dbConstuct = this.dbs[dbName];
        if (!dbConstuct) {
            throw "No DB Engine found for name: " + dbName;
        }
        var db = new dbConstuct(dbConnectionOptions.url, dbConnectionOptions.prefix, dbConnectionOptions.options);
        application.register(ModuleNames.DATABASE_MODULE, db);
        return db;
    }
}
