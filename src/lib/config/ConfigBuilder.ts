import * as _ from "lodash";
import * as path from "path";
import * as fs from "fs";
import * as Promise from "bluebird";
import AppConfig from "./AppConfig";
import { IConfigBuilder } from "./IConfigBuilder";

export default class ConfigBuilder {
    private builders: Array<IConfigBuilder>;
    private config: AppConfig;

    constructor(configFilePath?: string) {
        this.builders = [];
        if (!configFilePath && fs.existsSync("config.json")) {
            configFilePath = path.join(process.cwd(), "config.json");
        }
        this.config = new AppConfig(configFilePath);
    }

    addConfigOption(key: string, value: any): ConfigBuilder {
        this.config[key] = value;
        return this;
    }

    addConfigOptions(configJson?): ConfigBuilder {
        if (configJson) {
            this.config = _.merge(this.config, configJson);
        }
        return this;
    }

    addConfigBuilder(builder: IConfigBuilder): ConfigBuilder {
        this.builders.push(builder);
        return this;
    }

    build(): Promise<any> {
        let defers: Array<Promise<any>> = [];
        this.builders.forEach((builder: IConfigBuilder) => {
            defers.push(builder.configure(this.config));
        });
        return Promise.all(defers).then(() => {
            return this.config;
        });
    }
}
