import * as DependableList from "dependable-list";
import * as util from "util";
import * as _ from "lodash";
import DependantModule from "./DependantModule";

export default class ModuleList {
    // START: signtures for dependable list methods
    findOne: (func: Function) => any;
    dumpToConsole: () => void;
    traverse: (func: Function) => void;
    unresolved: any;
    add: (dependable: DependantModule, afterTime?) => void;
    listOfUnresolved: () => any;
    // END: signtures for dependable list methods

    constructor() {
        DependableList.call(this);
    }

    createModule(name: string, version: string, source, appFileName?: string): DependantModule {
        return new DependantModule(name, version, source, appFileName);
    }

    findModule(name: string): DependantModule {
        return this.findOne(this.compareNames.bind(null, name));
    }

    dependencyConstruct(): typeof DependantModule {
        return DependantModule;
    }

    private compareNames(name, dep) {
        return name === dep.name;
    }
}

util.inherits(ModuleList, DependableList);
