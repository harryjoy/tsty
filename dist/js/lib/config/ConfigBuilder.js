"use strict";
var _ = require("lodash");
var Promise = require("bluebird");
var AppConfig_1 = require("./AppConfig");
var ConfigBuilder = (function () {
    function ConfigBuilder() {
        this.builders = [];
        this.config = new AppConfig_1.default();
    }
    ConfigBuilder.prototype.addConfigOption = function (key, value) {
        this.config[key] = value;
        return this;
    };
    ConfigBuilder.prototype.addConfigOptions = function (configJson) {
        if (configJson) {
            this.config = _.merge(this.config, configJson);
        }
        return this;
    };
    ConfigBuilder.prototype.addConfigBuilder = function (builder) {
        this.builders.push(builder);
        return this;
    };
    ConfigBuilder.prototype.build = function () {
        var _this = this;
        var defers = [];
        this.builders.forEach(function (builder) {
            defers.push(builder.configure(_this.config));
        });
        return Promise.all(defers).then(function () {
            return _this.config;
        });
    };
    return ConfigBuilder;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConfigBuilder;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb25maWcvQ29uZmlnQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDNUIsSUFBWSxPQUFPLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFDcEMsMEJBQXNCLGFBQWEsQ0FBQyxDQUFBO0FBR3BDO0lBSUk7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksbUJBQVMsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCx1Q0FBZSxHQUFmLFVBQWdCLEdBQVcsRUFBRSxLQUFVO1FBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELHdDQUFnQixHQUFoQixVQUFpQixVQUFXO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsd0NBQWdCLEdBQWhCLFVBQWlCLE9BQXVCO1FBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELDZCQUFLLEdBQUw7UUFBQSxpQkFRQztRQVBHLElBQUksTUFBTSxHQUF3QixFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUF1QjtZQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDNUIsTUFBTSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQW5DQSxBQW1DQyxJQUFBO0FBbkNEOytCQW1DQyxDQUFBIiwiZmlsZSI6ImxpYi9jb25maWcvQ29uZmlnQnVpbGRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0ICogYXMgUHJvbWlzZSBmcm9tIFwiYmx1ZWJpcmRcIjtcbmltcG9ydCBBcHBDb25maWcgZnJvbSBcIi4vQXBwQ29uZmlnXCI7XG5pbXBvcnQgeyBJQ29uZmlnQnVpbGRlciB9IGZyb20gXCIuL0lDb25maWdCdWlsZGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmZpZ0J1aWxkZXIge1xuICAgIHByaXZhdGUgYnVpbGRlcnM6IEFycmF5PElDb25maWdCdWlsZGVyPjtcbiAgICBwcml2YXRlIGNvbmZpZzogQXBwQ29uZmlnO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYnVpbGRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgQXBwQ29uZmlnKCk7XG4gICAgfVxuXG4gICAgYWRkQ29uZmlnT3B0aW9uKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogQ29uZmlnQnVpbGRlciB7XG4gICAgICAgIHRoaXMuY29uZmlnW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYWRkQ29uZmlnT3B0aW9ucyhjb25maWdKc29uPyk6IENvbmZpZ0J1aWxkZXIge1xuICAgICAgICBpZiAoY29uZmlnSnNvbikge1xuICAgICAgICAgICAgdGhpcy5jb25maWcgPSBfLm1lcmdlKHRoaXMuY29uZmlnLCBjb25maWdKc29uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBhZGRDb25maWdCdWlsZGVyKGJ1aWxkZXI6IElDb25maWdCdWlsZGVyKTogQ29uZmlnQnVpbGRlciB7XG4gICAgICAgIHRoaXMuYnVpbGRlcnMucHVzaChidWlsZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYnVpbGQoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IGRlZmVyczogQXJyYXk8UHJvbWlzZTxhbnk+PiA9IFtdO1xuICAgICAgICB0aGlzLmJ1aWxkZXJzLmZvckVhY2goKGJ1aWxkZXI6IElDb25maWdCdWlsZGVyKSA9PiB7XG4gICAgICAgICAgICBkZWZlcnMucHVzaChidWlsZGVyLmNvbmZpZ3VyZSh0aGlzLmNvbmZpZykpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGRlZmVycykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25maWc7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
