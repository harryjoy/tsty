export function index(indexingObject) {
    return (clazz) => {
        clazz.prototype["$$indices"] = clazz.prototype["$$indices"] || [];
        clazz.prototype["$$indices"].push(indexingObject);
    }
}
