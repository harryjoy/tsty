import * as Promise from "bluebird";
import * as Types from "../types/Types";
import Application from "../../lib/awts";
import { IAppInitializer } from "./IAppInitializer";

export default class AppInitializer {
    private initializers: Array<IAppInitializer> = [];

    addInitializer(handler: IAppInitializer) {
        this.initializers.push(handler);
    }

    initialize<T>(app: Application): Promise<T> {
        const deferred: Promise.Resolver<T> = Promise.defer<T>();
        let promises = this.initializers.map((h) => { return h.initialize(app); });
        Promise.all(promises).then((...result) => {
            deferred.resolve(result[0]);
        }).catch((err) => {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}
