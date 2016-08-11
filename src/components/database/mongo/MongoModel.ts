import * as mongoose from "mongoose";
import { IDbModel } from "../IDbModel";

export interface MongoModel extends IDbModel {
    schema: mongoose.Schema;
    fields?: Array<any>;
    methods?: any;
    statics?: any;
}
