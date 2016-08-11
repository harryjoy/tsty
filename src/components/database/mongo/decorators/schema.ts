export function schema (clazz, method: string, descriptor: PropertyDescriptor) {
    clazz["$$schema"] = clazz[method]();
};
