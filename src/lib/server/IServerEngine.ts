import * as Types from "../../components/types/Types";
import { AppDatabase } from "../../components/database/Database";

export interface IServerEngine {
    name: string;

    destroy();
    start(application: Types.Application, database: Types.AppDatabase);
    afterStartup(cb?: Function);
}
