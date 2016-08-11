import * as fs from "fs";
import * as path from "path";
import * as Promise from "bluebird";
import * as Types from "../../components/types/Types";
import ModuleList from "./ModuleList";
import DependantModule from "./DependantModule";
import Logger from "../../components/logs/Logger";

export default class ModulesLoader {
    constructor(private packageJson: string, private moduleNameInPackageJson: string,
        private moduleAppFileNameInPackageJson: string,
        private moduleDependenciesInPackageJson: string) {}

    loadModule(list: ModuleList, disabledModules: Array<string>, moduleBase: string) {
        const deferred = Promise.defer();
        fs.readdir(path.join(process.cwd(), moduleBase), this.processDirs.bind(this, list, disabledModules, moduleBase, deferred));
        return deferred.promise;
    }

    private processDirs(list: ModuleList, disabledModules: Array<string>, moduleBase: string, deferred: Types.Resolver, error: any, files: Array<string>): void {
        if (!error && files && files.length > 0) {
            for (let i in disabledModules) {
                const index: number = files.indexOf(i);
                if (index < 0) { continue; }
                files.splice(index, 1);
            }
            let promises: Array<Promise<any>> = [];
            files.forEach((file: string) => {
                const deferred = Promise.defer();
                fs.readFile(path.join(process.cwd(), moduleBase, file, this.packageJson), this.processPacakgeJsonFile.bind(this, list, moduleBase, file, deferred));
                promises.push(deferred.promise);
            });
            Promise.all(promises).then(() => {
                return deferred.resolve();
            });
        } else {
            if (error && error.code !== "ENOENT") {
                Logger.error(error);
                return deferred.reject(error);
            }
            return deferred.resolve();
        }
    }

    private processPacakgeJsonFile(list: ModuleList, moduleBase: string, file: string, deferred: Types.Resolver, error: any, fileData: any) {
        if (error || !fileData) { return deferred.resolve(); }
        try {
            let data = JSON.parse(fileData);
            if (data[this.moduleNameInPackageJson]) {
                const moduleAppFile = data[this.moduleAppFileNameInPackageJson];
                const dependantModule: DependantModule = list.createModule(data.name, data.version, path.join(moduleBase, file), moduleAppFile);
                const dependencies = data[this.moduleDependenciesInPackageJson];
                if (dependencies) {
                    dependantModule.cloneDependencies(dependencies);
                }
                list.add(dependantModule);
            } else {
                return deferred.resolve();
            }
        } catch (err) {
            Logger.error(err);
            return deferred.reject(err);
        }
        return deferred.resolve();
    }
}
