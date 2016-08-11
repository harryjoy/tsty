import * as Promise from "bluebird";
import Application from "../../lib/awts";

export interface IAppInitializer {
    initialize<T>(app?: Application): Promise<T>;
}
