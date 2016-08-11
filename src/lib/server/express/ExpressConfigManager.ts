import { IExpressConfig } from "./IExpressConfig";

export default class ExpressConfigManager {
    private static configs: Array<IExpressConfig> = [];

    static getConfigs(): Array<IExpressConfig> {
        return this.configs;
    }

    static addConfig(constuct: IExpressConfig) {
        this.configs.push(constuct)
    }
}
