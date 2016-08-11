export function virtual (path, action = "get") {
    if ("string" !== typeof path ) {
        throw new Error("A virtual must have a path");
    }
    return (clazz, method, descriptor) => {
        if (!clazz["$$virtuals"]) {
            clazz["$$virtuals"] = {
                get: [],
                set: []
            }
        }
        clazz["$$virtuals"][action].push({
            path: path,
            method: clazz[method]
        });
    }
}
