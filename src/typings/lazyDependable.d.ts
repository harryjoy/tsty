declare module "lazy-dependable" {
    export class Container {
        register(name: string | Function | Object, cb?: Function | any);
        resolve(name: string | Function | Object, cb?: Function);
        get(name: string, cb: Function);
        destroy();
    }
}
