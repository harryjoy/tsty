export function method (clazz, method: string, descriptor: PropertyDescriptor) {
    (clazz["$$methods"] = clazz["$$methods"] || []).push({
        name: method,
        func: clazz[method]
    });
    clazz[`$$method_${method}`] = method;
}
