export function statics (clazz, method: string, descriptor: PropertyDescriptor) {
    clazz["$$statics"] = clazz["$$statics"] || [];
    clazz["$$statics"].push({
        name: method,
        func: clazz[method]
    });
}
