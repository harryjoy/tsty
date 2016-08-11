"use strict";
var ExpressServer_1 = require("./ExpressServer");
var ServerEngineFactory = (function () {
    function ServerEngineFactory() {
    }
    ServerEngineFactory.registerServerEngine = function (name, serverEngine) {
        this.engines[name] = serverEngine;
    };
    ServerEngineFactory.produceServerEngine = function (engineName) {
        var serverConstruct = this.engines[engineName];
        if (!serverConstruct) {
            throw "Server Engine with name, " + engineName + ", not found.";
        }
        return new serverConstruct();
    };
    ServerEngineFactory.engines = {
        express: ExpressServer_1.default
    };
    return ServerEngineFactory;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServerEngineFactory;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9zZXJ2ZXIvU2VydmVyRW5naW5lRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsOEJBQTBCLGlCQUFpQixDQUFDLENBQUE7QUFHNUM7SUFBQTtJQWdCQSxDQUFDO0lBWFUsd0NBQW9CLEdBQTNCLFVBQTRCLElBQVksRUFBRSxZQUEyQjtRQUNqRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQztJQUN0QyxDQUFDO0lBRU0sdUNBQW1CLEdBQTFCLFVBQTJCLFVBQWtCO1FBQ3pDLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sMkJBQTJCLEdBQUcsVUFBVSxHQUFHLGNBQWMsQ0FBQztRQUNwRSxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksZUFBZSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQWRjLDJCQUFPLEdBQWM7UUFDaEMsT0FBTyxFQUFFLHVCQUFhO0tBQ3pCLENBQUM7SUFhTiwwQkFBQztBQUFELENBaEJBLEFBZ0JDLElBQUE7QUFoQkQ7cUNBZ0JDLENBQUEiLCJmaWxlIjoibGliL3NlcnZlci9TZXJ2ZXJFbmdpbmVGYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVHlwZXMgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvdHlwZXMvVHlwZXNcIjtcbmltcG9ydCBFeHByZXNzU2VydmVyIGZyb20gXCIuL0V4cHJlc3NTZXJ2ZXJcIjtcbmltcG9ydCB7IElTZXJ2ZXJFbmdpbmUgfSBmcm9tIFwiLi9JU2VydmVyRW5naW5lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZlckVuZ2luZUZhY3Rvcnkge1xuICAgIHByaXZhdGUgc3RhdGljIGVuZ2luZXM6IFR5cGVzLk1hcCA9IHtcbiAgICAgICAgZXhwcmVzczogRXhwcmVzc1NlcnZlclxuICAgIH07XG5cbiAgICBzdGF0aWMgcmVnaXN0ZXJTZXJ2ZXJFbmdpbmUobmFtZTogc3RyaW5nLCBzZXJ2ZXJFbmdpbmU6IElTZXJ2ZXJFbmdpbmUpIHtcbiAgICAgICAgdGhpcy5lbmdpbmVzW25hbWVdID0gc2VydmVyRW5naW5lO1xuICAgIH1cblxuICAgIHN0YXRpYyBwcm9kdWNlU2VydmVyRW5naW5lKGVuZ2luZU5hbWU6IHN0cmluZyk6IElTZXJ2ZXJFbmdpbmUge1xuICAgICAgICB2YXIgc2VydmVyQ29uc3RydWN0ID0gdGhpcy5lbmdpbmVzW2VuZ2luZU5hbWVdO1xuICAgICAgICBpZiAoIXNlcnZlckNvbnN0cnVjdCkge1xuICAgICAgICAgICAgdGhyb3cgXCJTZXJ2ZXIgRW5naW5lIHdpdGggbmFtZSwgXCIgKyBlbmdpbmVOYW1lICsgXCIsIG5vdCBmb3VuZC5cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IHNlcnZlckNvbnN0cnVjdCgpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
