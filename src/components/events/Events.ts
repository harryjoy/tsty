import * as EventsEmitter from "eventemitter2";
import * as Helpers from "../utils/Helpers";

var methodsToCopyBind = [
    "addListener",
    "on",
    "onAny",
    "offAny",
    "once",
    "many",
    "removeListener",
    "off",
    "removeAllListeners",
    "setMaxListeners",
    "listeners",
    "listenersAny"
];

export default class Events {
    private emitter: EventsEmitter.EventEmitter2;
    private _default;
    private delimiter: string = ".";

    constructor(public name: string) {
        this.emitter = new EventsEmitter.EventEmitter2({
            wildcard: true,
            delimiter: this.delimiter,
            newListener: true,
            maxListeners: 20
        });

        methodsToCopyBind.forEach((method) => {
            this[method] = this.emitter[method].bind(this.emitter);
        });

        this._default = {};
    }

    emit(event: string | string[], cb?: Function | Object): boolean {
        const args = this.prepArgs(arguments, this.name, event, this._default);
        return this.emitter.emit.apply(this.emitter, args);
    }

    on(name: string | string[], cb: Function) {
        this.on(name, cb);
    }

    setDefaults(data) {
        Helpers.mergeObjects(data, this._default);
    }

    // Helps in preparing our arguments for passing to emit and emitAsync
    private prepArgs(args, name: string, event: any, defaults: any): any {
        args = Array.from(args);
        let namespace = [name];
        if (!Array.isArray(event)) {
            event = event.split(this.delimiter);
        }
        namespace = namespace.concat(event);
        args.shift();
        args.unshift(namespace);
        if (defaults) {
            args.push(defaults);
        }
        return args;
    }
}
