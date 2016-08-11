import * as Types from "../types/Types";

export interface IDbModel {
    name: string;
    schema: any;
    collection?: any;
    listeners?: Array<Types.Listener>;
    dbs?: Array<string>;
    db?: string;
    prototype?: any;
}
