"use strict";
var _ = require("lodash");
var path = require("path");
var fs = require("fs");
var Promise = require("bluebird");
var AppConfig_1 = require("./AppConfig");
var ConfigBuilder = (function () {
    function ConfigBuilder(configFilePath) {
        this.builders = [];
        if (!configFilePath && fs.existsSync("config.json")) {
            configFilePath = path.join(process.cwd(), "config.json");
        }
        this.config = new AppConfig_1.default(configFilePath);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb25maWcvQ29uZmlnQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDNUIsSUFBWSxJQUFJLFdBQU0sTUFBTSxDQUFDLENBQUE7QUFDN0IsSUFBWSxFQUFFLFdBQU0sSUFBSSxDQUFDLENBQUE7QUFDekIsSUFBWSxPQUFPLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFDcEMsMEJBQXNCLGFBQWEsQ0FBQyxDQUFBO0FBR3BDO0lBSUksdUJBQVksY0FBdUI7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksbUJBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsdUNBQWUsR0FBZixVQUFnQixHQUFXLEVBQUUsS0FBVTtRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCx3Q0FBZ0IsR0FBaEIsVUFBaUIsVUFBVztRQUN4QixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELHdDQUFnQixHQUFoQixVQUFpQixPQUF1QjtRQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCw2QkFBSyxHQUFMO1FBQUEsaUJBUUM7UUFQRyxJQUFJLE1BQU0sR0FBd0IsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBdUI7WUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0F0Q0EsQUFzQ0MsSUFBQTtBQXRDRDsrQkFzQ0MsQ0FBQSIsImZpbGUiOiJsaWIvY29uZmlnL0NvbmZpZ0J1aWxkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgUHJvbWlzZSBmcm9tIFwiYmx1ZWJpcmRcIjtcbmltcG9ydCBBcHBDb25maWcgZnJvbSBcIi4vQXBwQ29uZmlnXCI7XG5pbXBvcnQgeyBJQ29uZmlnQnVpbGRlciB9IGZyb20gXCIuL0lDb25maWdCdWlsZGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmZpZ0J1aWxkZXIge1xuICAgIHByaXZhdGUgYnVpbGRlcnM6IEFycmF5PElDb25maWdCdWlsZGVyPjtcbiAgICBwcml2YXRlIGNvbmZpZzogQXBwQ29uZmlnO1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlnRmlsZVBhdGg/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5idWlsZGVycyA9IFtdO1xuICAgICAgICBpZiAoIWNvbmZpZ0ZpbGVQYXRoICYmIGZzLmV4aXN0c1N5bmMoXCJjb25maWcuanNvblwiKSkge1xuICAgICAgICAgICAgY29uZmlnRmlsZVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJjb25maWcuanNvblwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBBcHBDb25maWcoY29uZmlnRmlsZVBhdGgpO1xuICAgIH1cblxuICAgIGFkZENvbmZpZ09wdGlvbihrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IENvbmZpZ0J1aWxkZXIge1xuICAgICAgICB0aGlzLmNvbmZpZ1trZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGFkZENvbmZpZ09wdGlvbnMoY29uZmlnSnNvbj8pOiBDb25maWdCdWlsZGVyIHtcbiAgICAgICAgaWYgKGNvbmZpZ0pzb24pIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnID0gXy5tZXJnZSh0aGlzLmNvbmZpZywgY29uZmlnSnNvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYWRkQ29uZmlnQnVpbGRlcihidWlsZGVyOiBJQ29uZmlnQnVpbGRlcik6IENvbmZpZ0J1aWxkZXIge1xuICAgICAgICB0aGlzLmJ1aWxkZXJzLnB1c2goYnVpbGRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGJ1aWxkKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGxldCBkZWZlcnM6IEFycmF5PFByb21pc2U8YW55Pj4gPSBbXTtcbiAgICAgICAgdGhpcy5idWlsZGVycy5mb3JFYWNoKChidWlsZGVyOiBJQ29uZmlnQnVpbGRlcikgPT4ge1xuICAgICAgICAgICAgZGVmZXJzLnB1c2goYnVpbGRlci5jb25maWd1cmUodGhpcy5jb25maWcpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChkZWZlcnMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
