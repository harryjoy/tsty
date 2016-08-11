export function method (clazz, method, descriptor) {
    (clazz["$$methods"] = clazz["$$methods"] || []).push({
        name: method,
        func: clazz[method]
    });
    clazz[`$$method_${method}`] = method;
}
