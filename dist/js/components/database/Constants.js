"use strict";
var Constants = (function () {
    function Constants() {
    }
    Constants.connStats = {
        DISCONNECTED: 0,
        CONNECTED: 1,
        CONNECTING: 2,
        DISCONNECTING: 3
    };
    Constants.connEvents = {
        CONNECTING: "connecting",
        DISCONNECTING: 'disconnecting',
        CONNECTED: 'connected',
        DISCONNECTED: 'disconnected'
    };
    return Constants;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Constants;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0YWJhc2UvQ29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTtJQUFBO0lBY0EsQ0FBQztJQWJVLG1CQUFTLEdBQWM7UUFDMUIsWUFBWSxFQUFFLENBQUM7UUFDZixTQUFTLEVBQUcsQ0FBQztRQUNiLFVBQVUsRUFBRSxDQUFDO1FBQ2IsYUFBYSxFQUFFLENBQUM7S0FDbkIsQ0FBQztJQUVLLG9CQUFVLEdBQWM7UUFDM0IsVUFBVSxFQUFFLFlBQVk7UUFDeEIsYUFBYSxFQUFFLGVBQWU7UUFDOUIsU0FBUyxFQUFFLFdBQVc7UUFDdEIsWUFBWSxFQUFFLGNBQWM7S0FDL0IsQ0FBQztJQUNOLGdCQUFDO0FBQUQsQ0FkQSxBQWNDLElBQUE7QUFkRDsyQkFjQyxDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvZGF0YWJhc2UvQ29uc3RhbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVHlwZXMgZnJvbSBcIi4uL3R5cGVzL1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnN0YW50cyB7XG4gICAgc3RhdGljIGNvbm5TdGF0czogVHlwZXMuTWFwID0ge1xuICAgICAgICBESVNDT05ORUNURUQ6IDAsXG4gICAgICAgIENPTk5FQ1RFRCA6IDEsXG4gICAgICAgIENPTk5FQ1RJTkc6IDIsXG4gICAgICAgIERJU0NPTk5FQ1RJTkc6IDNcbiAgICB9O1xuXG4gICAgc3RhdGljIGNvbm5FdmVudHM6IFR5cGVzLk1hcCA9IHtcbiAgICAgICAgQ09OTkVDVElORzogXCJjb25uZWN0aW5nXCIsXG4gICAgICAgIERJU0NPTk5FQ1RJTkc6ICdkaXNjb25uZWN0aW5nJyxcbiAgICAgICAgQ09OTkVDVEVEOiAnY29ubmVjdGVkJyxcbiAgICAgICAgRElTQ09OTkVDVEVEOiAnZGlzY29ubmVjdGVkJ1xuICAgIH07XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
