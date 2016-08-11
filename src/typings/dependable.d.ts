declare namespace Dependable {
    class Container {
        register(name: string, cb?: Function | string | Object);
        register(name: Function | Object);
        load(fileOrFolder: string);
        get(name: string, overrides: Object);
        resolve(name: string | Function | Object, cb?: Function);
        list();
    }
    class DependableConstruct {
        container(): Container;
    }
}
declare var dependable: Dependable.DependableConstruct;

declare module "dependable" {
    export = dependable;
}
