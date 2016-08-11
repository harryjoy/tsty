interface Array<T> {
    from(arrayLike: any, mapFn?, thisArg?): Array<any>;
}

interface ArrayConstructor {
    from(arrayLike: any, mapFn?, thisArg?): Array<any>;
}
