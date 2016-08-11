"use strict";
var Logger_1 = require("../../components/logs/Logger");
var DbFactory_1 = require("../../components/database/DbFactory");
var ModuleNames_1 = require("../config/ModuleNames");
var ServerEngineFactory_1 = require("../server/ServerEngineFactory");
var Handler = (function () {
    function Handler() {
    }
    Handler.prototype.startServer = function (application, options, cb) {
        var _this = this;
        if (application.active) {
            cb(application);
            Logger_1.default.info("Application server is already up.");
            return;
        }
        application.buildConfiguration().then(function () {
            application.active = true;
            application.options = options;
            _this.connectToDbAndStartApp(application, cb);
        }).catch(function (err) {
            Logger_1.default.error(err);
            throw err;
        });
    };
    Handler.prototype.connectToDbAndStartApp = function (application, cb) {
        var database = DbFactory_1.default.produceDatabaseEngine(application.config.db || "mongo", {
            url: application.config.dbOptions.url,
            prefix: application.config.dbOptions.prefix,
            options: application.config.dbOptions.options,
        });
        database.connect();
        application.resolve(ModuleNames_1.default.DATABASE_MODULE, this.startEngine.bind(null, application, cb));
    };
    Handler.prototype.startEngine = function (application, cb, database) {
        var config = application.config;
        var serverEngine = ServerEngineFactory_1.default.produceServerEngine(config.serverEngine || "express");
        serverEngine.start(application, database);
        application.executeInitializers().then(function () {
            serverEngine.afterStartup(function () {
                if (cb) {
                    cb(application);
                }
            });
        });
    };
    return Handler;
}());
exports.ServerHandler = new Handler();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9hcHAvU2VydmVySGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsdUJBQW1CLDhCQUE4QixDQUFDLENBQUE7QUFDbEQsMEJBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQsNEJBQXdCLHVCQUF1QixDQUFDLENBQUE7QUFDaEQsb0NBQWdDLCtCQUErQixDQUFDLENBQUE7QUFFaEU7SUFBQTtJQXNDQSxDQUFDO0lBckNHLDZCQUFXLEdBQVgsVUFBWSxXQUE4QixFQUFFLE9BQVksRUFBRSxFQUFhO1FBQXZFLGlCQWNDO1FBYkcsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hCLGdCQUFNLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7WUFDakQsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUNELFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQztZQUNsQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUMxQixXQUFXLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUM5QixLQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLEdBQUc7WUFDVCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixNQUFNLEdBQUcsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLHdDQUFzQixHQUE5QixVQUErQixXQUE4QixFQUFFLEVBQWE7UUFDeEUsSUFBTSxRQUFRLEdBQUcsbUJBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxPQUFPLEVBQUU7WUFDL0UsR0FBRyxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUc7WUFDckMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU07WUFDM0MsT0FBTyxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU87U0FDaEQsQ0FBQyxDQUFDO1FBQ0gsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRW5CLFdBQVcsQ0FBQyxPQUFPLENBQUMscUJBQVcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUFFTyw2QkFBVyxHQUFuQixVQUFvQixXQUE4QixFQUFFLEVBQVksRUFBRSxRQUEyQjtRQUN6RixJQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ2xDLElBQU0sWUFBWSxHQUFHLDZCQUFtQixDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksU0FBUyxDQUFDLENBQUM7UUFDL0YsWUFBWSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDMUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ25DLFlBQVksQ0FBQyxZQUFZLENBQUM7Z0JBQ3RCLEVBQUUsQ0FBQSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0F0Q0EsQUFzQ0MsSUFBQTtBQUVVLHFCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQyIsImZpbGUiOiJsaWIvYXBwL1NlcnZlckhhbmRsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBQcm9taXNlIGZyb20gXCJibHVlYmlyZFwiO1xuaW1wb3J0ICogYXMgVHlwZXMgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvdHlwZXMvVHlwZXNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvbG9ncy9Mb2dnZXJcIjtcbmltcG9ydCBEYkZhY3RvcnkgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvZGF0YWJhc2UvRGJGYWN0b3J5XCI7XG5pbXBvcnQgTW9kdWxlTmFtZXMgZnJvbSBcIi4uL2NvbmZpZy9Nb2R1bGVOYW1lc1wiO1xuaW1wb3J0IFNlcnZlckVuZ2luZUZhY3RvcnkgZnJvbSBcIi4uL3NlcnZlci9TZXJ2ZXJFbmdpbmVGYWN0b3J5XCI7XG5cbmNsYXNzIEhhbmRsZXIge1xuICAgIHN0YXJ0U2VydmVyKGFwcGxpY2F0aW9uOiBUeXBlcy5BcHBsaWNhdGlvbiwgb3B0aW9uczogYW55LCBjYj86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmIChhcHBsaWNhdGlvbi5hY3RpdmUpIHtcbiAgICAgICAgICAgIGNiKGFwcGxpY2F0aW9uKTtcbiAgICAgICAgICAgIExvZ2dlci5pbmZvKFwiQXBwbGljYXRpb24gc2VydmVyIGlzIGFscmVhZHkgdXAuXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGFwcGxpY2F0aW9uLmJ1aWxkQ29uZmlndXJhdGlvbigpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgYXBwbGljYXRpb24uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9EYkFuZFN0YXJ0QXBwKGFwcGxpY2F0aW9uLCBjYik7XG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbm5lY3RUb0RiQW5kU3RhcnRBcHAoYXBwbGljYXRpb246IFR5cGVzLkFwcGxpY2F0aW9uLCBjYj86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGRhdGFiYXNlID0gRGJGYWN0b3J5LnByb2R1Y2VEYXRhYmFzZUVuZ2luZShhcHBsaWNhdGlvbi5jb25maWcuZGIgfHwgXCJtb25nb1wiLCB7XG4gICAgICAgICAgICB1cmw6IGFwcGxpY2F0aW9uLmNvbmZpZy5kYk9wdGlvbnMudXJsLFxuICAgICAgICAgICAgcHJlZml4OiBhcHBsaWNhdGlvbi5jb25maWcuZGJPcHRpb25zLnByZWZpeCxcbiAgICAgICAgICAgIG9wdGlvbnM6IGFwcGxpY2F0aW9uLmNvbmZpZy5kYk9wdGlvbnMub3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICAgIGRhdGFiYXNlLmNvbm5lY3QoKTtcblxuICAgICAgICBhcHBsaWNhdGlvbi5yZXNvbHZlKE1vZHVsZU5hbWVzLkRBVEFCQVNFX01PRFVMRSwgdGhpcy5zdGFydEVuZ2luZS5iaW5kKG51bGwsIGFwcGxpY2F0aW9uLCBjYikpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhcnRFbmdpbmUoYXBwbGljYXRpb246IFR5cGVzLkFwcGxpY2F0aW9uLCBjYjogRnVuY3Rpb24sIGRhdGFiYXNlOiBUeXBlcy5BcHBEYXRhYmFzZSkge1xuICAgICAgICBjb25zdCBjb25maWcgPSBhcHBsaWNhdGlvbi5jb25maWc7XG4gICAgICAgIGNvbnN0IHNlcnZlckVuZ2luZSA9IFNlcnZlckVuZ2luZUZhY3RvcnkucHJvZHVjZVNlcnZlckVuZ2luZShjb25maWcuc2VydmVyRW5naW5lIHx8IFwiZXhwcmVzc1wiKTtcbiAgICAgICAgc2VydmVyRW5naW5lLnN0YXJ0KGFwcGxpY2F0aW9uLCBkYXRhYmFzZSk7XG4gICAgICAgIGFwcGxpY2F0aW9uLmV4ZWN1dGVJbml0aWFsaXplcnMoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHNlcnZlckVuZ2luZS5hZnRlclN0YXJ0dXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGNiKSB7IGNiKGFwcGxpY2F0aW9uKTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IHZhciBTZXJ2ZXJIYW5kbGVyID0gbmV3IEhhbmRsZXIoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
