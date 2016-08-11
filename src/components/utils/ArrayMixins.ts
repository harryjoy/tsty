
Array.prototype["containsAsync"] = (key, cb) => {
    let self = this;
    return (function check(i) {
        if (i >= self.length) { return cb(false); }
        if (self[i] === key) { return cb(true); }
        return process.nextTick(check.bind(null, i + 1));
    }(0));
};

Array.prototype["contains"] = (key, cb) => {
    let self = this;
    if (self.length <= 0) { return false; }
    for (let i = 0; i < self.length; i++) {
        if (self[i] === key) { return true; }
    }
    return false;
};
