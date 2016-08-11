interface INameAndFunc {
    name: string;
    func: Function;
}

interface IHookAndMethod {
    hook: string;
    method: Function;
}

interface IPathAndMethod {
    path: string;
    method: string;
    message?: string;
}

interface IFnAndOptions {
    fn: Function;
    options?: any;
}

export function model (Clazz) {
    let original = Clazz;
    let f: any = function (...args) {
        return buildModelSchema(Clazz);
    };
    f.prototype = original.prototype;
    return f;
}

function buildModelSchema(Clazz) {
    const schema        = Clazz.prototype["$$schema"] || {};
    const methods       = Clazz.prototype["$$methods"] || [];
    const hooks         = Clazz.prototype["$$hooks"] || [];
    const statics       = Clazz.prototype["$$statics"] || [];
    const virtuals      = Clazz.prototype["$$virtuals"] || [];
    const plugins       = Clazz.prototype["$$plugins"] || [];
    const indices       = Clazz.prototype["$$indices"] || [];
    const validators    = Clazz.prototype["$$validators"] || [];

    let clazz  = new Clazz;

    clazz.add(schema);

    // Methods
    clazz.methods = clazz.methods || {};
    methods.forEach((fn: {
        name: string;
        func: Function;
    }) => {
        clazz.methods[fn.name] = fn.func;
    });

    // Hooks - pre/post
    (hooks["pre"] || []).forEach((hook: IHookAndMethod) => {
        clazz.pre(hook.hook, hook.method);
    });
    (hooks["post"] || []).forEach((hook: IHookAndMethod) => {
        clazz.pre(hook.hook, hook.method);
    });

    // Statics
    statics.forEach((fn: INameAndFunc) => {
        clazz.statics[fn.name] = fn;
    });

    // Virtuals - get/set
    (virtuals["get"] || []).forEach((virtual: IPathAndMethod) => {
        clazz.virtual(virtual.path)["get"](virtual.method);
    });

    (virtuals["set"] || []).forEach((virtual: IPathAndMethod) => {
        clazz.virtual(virtual.path)["set"](virtual.method);
    });

    // validates
    validators.forEach((validator: IPathAndMethod) => {
        clazz.path(validator.path).validate(validator.method,
            (validator.message || ("Invalid value for: " + validator.path)));
    });

    // Plugins
    plugins.forEach((plugin: IFnAndOptions) => {
        clazz.plugin(plugin.fn, plugin.options);
    });

    indices.forEach((index: any) => {
        clazz.index(index);
    });

    return clazz;
}
