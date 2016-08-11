import * as path from "path";
import * as _ from "lodash";
import * as util from "util";
import * as DependableList from "dependable-list";
import ModuleConfig from "./ModuleConfig";
import ModuleList from "./ModuleList";

export default class DependantModule extends DependableList.dependableConstructor() {
    constructor(public name: string, public version: string, public source, public appFileName?: string) {
        super();
        if (!this.appFileName) {
            this.appFileName = ModuleConfig.DEFAULT_APP_FILE_NAME;
        }
    }

    get path(): string {
        return path.join(process.cwd(), this.source);
    }

    clear() {
        this.name = null;
        this.version = null;
        this.source = null;
        this.appFileName = ModuleConfig.DEFAULT_APP_FILE_NAME;
    }

    destroy() {
        this.clear();
    }

    buildPathWith(additionalPath: string): string {
        return path.join(this.path, additionalPath);
    }

    load() {
        let modulePath: string = this.buildPathWith(this.appFileName);
        let req = require(modulePath);
        if (req && "function" === req.init) {
            req.init(this);
        }
    }
}
