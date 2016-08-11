export function plugin (fn: Function, opts?) {
    if (!(fn instanceof Function)) {
        throw new Error("Plugin must be a function");
    }
    return (clazz) => {
        clazz.prototype["$$plugins"] = clazz.prototype["$$plugins"] || [];
        clazz.prototype["$$plugins"].push({
            fn: fn,
            options: opts
        });
    }
}
