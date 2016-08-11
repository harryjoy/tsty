import * as Types from "../types/Types";

export default class Constants {
    static connStats: Types.Map = {
        DISCONNECTED: 0,
        CONNECTED : 1,
        CONNECTING: 2,
        DISCONNECTING: 3
    };

    static connEvents: Types.Map = {
        CONNECTING: "connecting",
        DISCONNECTING: 'disconnecting',
        CONNECTED: 'connected',
        DISCONNECTED: 'disconnected'
    };
}
