import * as Promise from "bluebird";
import * as Types from "../../components/types/Types";
import * as App from "../../index";

interface TestDbModel extends App.IDbModel {
}

interface TestDbConnection {
}

export default class TestDB extends App.Database<TestDbConnection, TestDbModel, TestDbModel> {
    connect(): Promise<{}> {
        var defer = Promise.defer();
        defer.resolve(true);
        return defer.promise;
    }

    disconnect(): Promise<{}> {
        var defer = Promise.defer();
        defer.resolve(true);
        return defer.promise;
    }

    isConnected(): boolean {
        return true;
    }

    listen(name: string, cb: Function): void | any {
    }

    updateModelStructure(model: TestDbModel) {
    }

    bindModelListeners(modelData: TestDbModel, listeners: Array<Types.Listener>) {
    }

    registerModel(modelData: TestDbModel): Array<TestDbModel> {
        return [modelData];
    }
}
