"use strict";
var TestInitializer = (function () {
    function TestInitializer() {
    }
    TestInitializer.prototype.initialize = function (app) {
        var defer = Promise.defer();
        defer.resolve(true);
        return defer.promise;
    };
    return TestInitializer;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TestInitializer;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RzL21vY2tzL1Rlc3RJbml0aWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7SUFBQTtJQU1BLENBQUM7SUFMRyxvQ0FBVSxHQUFWLFVBQVcsR0FBNEI7UUFDbkMsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzlCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FOQSxBQU1DLElBQUE7QUFORDtpQ0FNQyxDQUFBIiwiZmlsZSI6InRlc3RzL21vY2tzL1Rlc3RJbml0aWFsaXplci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEFwcCBmcm9tIFwiLi4vLi4vaW5kZXhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdEluaXRpYWxpemVyIGltcGxlbWVudHMgQXBwLklBcHBJbml0aWFsaXplciB7XG4gICAgaW5pdGlhbGl6ZShhcHA/OiB0eXBlb2YgQXBwLmFwcGxpY2F0aW9uKTogUHJvbWlzZTx7fT4ge1xuICAgICAgICBjb25zdCBkZWZlciA9IFByb21pc2UuZGVmZXIoKTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
