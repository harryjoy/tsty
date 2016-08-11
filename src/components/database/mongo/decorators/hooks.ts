export function pre (...args) {
    return HookManager.addHook(args, "pre");
}

export function post (...args) {
    return HookManager.addHook(args);
}

class HookManager {
    static HOOKS = ["init", "validate", "save", "remove", "find", "update"];

    static addHook (args: Array<any>, action: string = "post") {
        let hook = (args.length === 3) ? args[1] : args[0];

        if (HookManager.HOOKS.indexOf(hook) === -1) {
            throw new Error(`${hook} is not a supported hook. Supported hooks are ${HookManager.HOOKS}`);
        }

        if (args.length === 3) {
            if (!args[0]["$$hooks"]) {
                args[0]["$$hooks"] = {
                    pre: [],
                    post: []
                }
            }
            args[0]["$$hooks"][action].push({
                hook: hook,
                method: args[0][args[1]]
            });
        } else {
            return (clazz, method) => {
                if (!clazz["$$hooks"]) {
                    clazz["$$hooks"] = {
                        pre: [],
                        post: []
                    }
                }
                clazz["$$hooks"][action].push({
                    hook: hook,
                    method: clazz[method]
                });
            };
        }
    }
}
