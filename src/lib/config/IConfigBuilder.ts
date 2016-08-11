import * as Promise from "bluebird";
import AppConfig from "./AppConfig";

export interface IConfigBuilder {
    configure(config: AppConfig): Promise<any>;
}
