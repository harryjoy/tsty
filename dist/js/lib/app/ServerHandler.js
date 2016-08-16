"use strict";
var StaticLogger_1 = require("../../components/logs/StaticLogger");
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
            StaticLogger_1.default.info("Application server is already up.");
            return;
        }
        application.buildConfiguration().then(function () {
            application.active = true;
            application.options = options;
            _this.connectToDbAndStartApp(application, cb);
        }).catch(function (err) {
            StaticLogger_1.default.error(err);
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
        var serverEngine = ServerEngineFactory_1.default.produceServerEngine(application.config.serverEngine || "express");
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9hcHAvU2VydmVySGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsNkJBQXlCLG9DQUFvQyxDQUFDLENBQUE7QUFDOUQsMEJBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQsNEJBQXdCLHVCQUF1QixDQUFDLENBQUE7QUFDaEQsb0NBQWdDLCtCQUErQixDQUFDLENBQUE7QUFFaEU7SUFBQTtJQXFDQSxDQUFDO0lBcENHLDZCQUFXLEdBQVgsVUFBWSxXQUE4QixFQUFFLE9BQVksRUFBRSxFQUFhO1FBQXZFLGlCQWNDO1FBYkcsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hCLHNCQUFZLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7WUFDdkQsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUNELFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQztZQUNsQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUMxQixXQUFXLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUM5QixLQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLEdBQUc7WUFDVCxzQkFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixNQUFNLEdBQUcsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLHdDQUFzQixHQUE5QixVQUErQixXQUE4QixFQUFFLEVBQWE7UUFDeEUsSUFBTSxRQUFRLEdBQUcsbUJBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxPQUFPLEVBQUU7WUFDL0UsR0FBRyxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUc7WUFDckMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU07WUFDM0MsT0FBTyxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU87U0FDaEQsQ0FBQyxDQUFDO1FBQ0gsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRW5CLFdBQVcsQ0FBQyxPQUFPLENBQUMscUJBQVcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUFFTyw2QkFBVyxHQUFuQixVQUFvQixXQUE4QixFQUFFLEVBQVksRUFBRSxRQUEyQjtRQUN6RixJQUFNLFlBQVksR0FBRyw2QkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFlBQVksSUFBSSxTQUFTLENBQUMsQ0FBQztRQUMzRyxZQUFZLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDbkMsWUFBWSxDQUFDLFlBQVksQ0FBQztnQkFDdEIsRUFBRSxDQUFBLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQUMsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQXJDQSxBQXFDQyxJQUFBO0FBRVUscUJBQWEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDIiwiZmlsZSI6ImxpYi9hcHAvU2VydmVySGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFByb21pc2UgZnJvbSBcImJsdWViaXJkXCI7XG5pbXBvcnQgKiBhcyBUeXBlcyBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy90eXBlcy9UeXBlc1wiO1xuaW1wb3J0IFN0YXRpY0xvZ2dlciBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9sb2dzL1N0YXRpY0xvZ2dlclwiO1xuaW1wb3J0IERiRmFjdG9yeSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9kYXRhYmFzZS9EYkZhY3RvcnlcIjtcbmltcG9ydCBNb2R1bGVOYW1lcyBmcm9tIFwiLi4vY29uZmlnL01vZHVsZU5hbWVzXCI7XG5pbXBvcnQgU2VydmVyRW5naW5lRmFjdG9yeSBmcm9tIFwiLi4vc2VydmVyL1NlcnZlckVuZ2luZUZhY3RvcnlcIjtcblxuY2xhc3MgSGFuZGxlciB7XG4gICAgc3RhcnRTZXJ2ZXIoYXBwbGljYXRpb246IFR5cGVzLkFwcGxpY2F0aW9uLCBvcHRpb25zOiBhbnksIGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKGFwcGxpY2F0aW9uLmFjdGl2ZSkge1xuICAgICAgICAgICAgY2IoYXBwbGljYXRpb24pO1xuICAgICAgICAgICAgU3RhdGljTG9nZ2VyLmluZm8oXCJBcHBsaWNhdGlvbiBzZXJ2ZXIgaXMgYWxyZWFkeSB1cC5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXBwbGljYXRpb24uYnVpbGRDb25maWd1cmF0aW9uKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBhcHBsaWNhdGlvbi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgYXBwbGljYXRpb24ub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RUb0RiQW5kU3RhcnRBcHAoYXBwbGljYXRpb24sIGNiKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgU3RhdGljTG9nZ2VyLmVycm9yKGVycik7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29ubmVjdFRvRGJBbmRTdGFydEFwcChhcHBsaWNhdGlvbjogVHlwZXMuQXBwbGljYXRpb24sIGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgZGF0YWJhc2UgPSBEYkZhY3RvcnkucHJvZHVjZURhdGFiYXNlRW5naW5lKGFwcGxpY2F0aW9uLmNvbmZpZy5kYiB8fCBcIm1vbmdvXCIsIHtcbiAgICAgICAgICAgIHVybDogYXBwbGljYXRpb24uY29uZmlnLmRiT3B0aW9ucy51cmwsXG4gICAgICAgICAgICBwcmVmaXg6IGFwcGxpY2F0aW9uLmNvbmZpZy5kYk9wdGlvbnMucHJlZml4LFxuICAgICAgICAgICAgb3B0aW9uczogYXBwbGljYXRpb24uY29uZmlnLmRiT3B0aW9ucy5vcHRpb25zLFxuICAgICAgICB9KTtcbiAgICAgICAgZGF0YWJhc2UuY29ubmVjdCgpO1xuXG4gICAgICAgIGFwcGxpY2F0aW9uLnJlc29sdmUoTW9kdWxlTmFtZXMuREFUQUJBU0VfTU9EVUxFLCB0aGlzLnN0YXJ0RW5naW5lLmJpbmQobnVsbCwgYXBwbGljYXRpb24sIGNiKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGFydEVuZ2luZShhcHBsaWNhdGlvbjogVHlwZXMuQXBwbGljYXRpb24sIGNiOiBGdW5jdGlvbiwgZGF0YWJhc2U6IFR5cGVzLkFwcERhdGFiYXNlKSB7XG4gICAgICAgIGNvbnN0IHNlcnZlckVuZ2luZSA9IFNlcnZlckVuZ2luZUZhY3RvcnkucHJvZHVjZVNlcnZlckVuZ2luZShhcHBsaWNhdGlvbi5jb25maWcuc2VydmVyRW5naW5lIHx8IFwiZXhwcmVzc1wiKTtcbiAgICAgICAgc2VydmVyRW5naW5lLnN0YXJ0KGFwcGxpY2F0aW9uLCBkYXRhYmFzZSk7XG4gICAgICAgIGFwcGxpY2F0aW9uLmV4ZWN1dGVJbml0aWFsaXplcnMoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHNlcnZlckVuZ2luZS5hZnRlclN0YXJ0dXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGNiKSB7IGNiKGFwcGxpY2F0aW9uKTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IHZhciBTZXJ2ZXJIYW5kbGVyID0gbmV3IEhhbmRsZXIoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
