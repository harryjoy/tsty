import * as _ from "lodash";
import * as Types from "../../components/types/Types";
import { IFramework, IConfig } from "./IConfig";

export default class AppConfig implements IConfig {
    framework: IFramework;
    additionalConfigs: Types.Map;

    constructor(configFilePath?: string) {
        const configJson = require("../config.json");
        _.merge(this, configJson);
        if (configFilePath) {
            const customConfig = require(configFilePath);
            _.merge(this, customConfig);
        }

        const packageJson = require("../../../package.json");
        this.framework = {
            name: packageJson.name,
            version: packageJson.version
        };

        this.additionalConfigs = {};
    }

    putExtra(key: string, value: any, override?: boolean): boolean {
        if (this.additionalConfigs[key] && !override) {
            return false;
        }
        this.additionalConfigs[key] = value;
        return true;
    }

    getExtra(key: string): any {
        return this.additionalConfigs[key];
    }
}
