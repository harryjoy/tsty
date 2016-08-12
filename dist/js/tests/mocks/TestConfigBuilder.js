"use strict";
var TestConfigBuilder = (function () {
    function TestConfigBuilder() {
    }
    TestConfigBuilder.prototype.configure = function (config) {
        var defer = Promise.defer();
        config.db = "test";
        config["me"] = "harsh raval";
        config.putExtra("ok", "awesome");
        defer.resolve();
        return defer.promise;
    };
    return TestConfigBuilder;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TestConfigBuilder;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RzL21vY2tzL1Rlc3RDb25maWdCdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTtJQUFBO0lBU0EsQ0FBQztJQVJHLHFDQUFTLEdBQVQsVUFBVSxNQUF5QjtRQUMvQixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsTUFBTSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQztRQUM3QixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FUQSxBQVNDLElBQUE7QUFURDttQ0FTQyxDQUFBIiwiZmlsZSI6InRlc3RzL21vY2tzL1Rlc3RDb25maWdCdWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQXBwIGZyb20gXCIuLi8uLi9pbmRleFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0Q29uZmlnQnVpbGRlciBpbXBsZW1lbnRzIEFwcC5JQ29uZmlnQnVpbGRlciB7XG4gICAgY29uZmlndXJlKGNvbmZpZzogQXBwLkNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgdmFyIGRlZmVyID0gUHJvbWlzZS5kZWZlcigpO1xuICAgICAgICBjb25maWcuZGIgPSBcInRlc3RcIjtcbiAgICAgICAgY29uZmlnW1wibWVcIl0gPSBcImhhcnNoIHJhdmFsXCI7XG4gICAgICAgIGNvbmZpZy5wdXRFeHRyYShcIm9rXCIsIFwiYXdlc29tZVwiKTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
