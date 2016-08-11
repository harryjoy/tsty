import * as Types from "../../components/types/Types";
import ExpressServer from "./ExpressServer";
import { IServerEngine } from "./IServerEngine";

export default class ServerEngineFactory {
    private static engines: Types.Map = {
        express: ExpressServer
    };

    static registerServerEngine(name: string, serverEngine: IServerEngine) {
        this.engines[name] = serverEngine;
    }

    static produceServerEngine(engineName: string): IServerEngine {
        var serverConstruct = this.engines[engineName];
        if (!serverConstruct) {
            throw "Server Engine with name, " + engineName + ", not found.";
        }
        return new serverConstruct();
    }
}
