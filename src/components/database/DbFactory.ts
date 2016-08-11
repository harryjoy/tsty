import * as Types from "../../components/types/Types";
import Logger from "../../components/logs/Logger";
import MongoDatabase from "../../components/database/mongo/MongoDatabase";
import { AppDatabase } from "../../components/database/Database";

export default class DbFactory {
    private static dbs: Types.Map = {
        mongo: MongoDatabase
    };

    static registerDbEngine(name: string, dbEngine: Types.AppDatabase) {
        this.dbs[name] = dbEngine;
    }

    static produceDatabaseEngine(dbName: string, dbConnectionOptions: Types.DbConnOptions): Types.AppDatabase {
        var dbConstuct = this.dbs[dbName];
        if (!dbConstuct) {
            throw "No DB Engine found for name: " + dbName;
        }
        return new dbConstuct(dbConnectionOptions.url, dbConnectionOptions.prefix, dbConnectionOptions.options);
    }
}
