export function validate (path: string, message?: string) {
    return (clazz, method: string, descriptor: PropertyDescriptor) => {
        clazz["$$validators"] = clazz["$$validators"] || [];
        clazz["$$validators"].push({
            path: path,
            method: clazz[method],
            message: message
        });
    }
}
