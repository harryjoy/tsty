"use strict";
var util = require("util");
var LazyDependable = require("lazy-dependable");
var Logger_1 = require("../components/logs/Logger");
var ModuleList_1 = require("./module/ModuleList");
var ServerHandler_1 = require("./app/ServerHandler");
var Application = (function () {
    function Application(initializer, configBuilder) {
        this.initializer = initializer;
        this.configBuilder = configBuilder;
        this.active = false;
        this.modules = new ModuleList_1.default();
        LazyDependable.Container.call(this);
        this.exportableModules = [];
        this.serve = ServerHandler_1.ServerHandler.startServer.bind(ServerHandler_1.ServerHandler, this);
    }
    Object.defineProperty(Application.prototype, "version", {
        get: function () {
            return this.config.framework.version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "name", {
        get: function () {
            return this.config.framework.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "status", {
        get: function () {
            return {
                name: this.name,
                version: this.version,
                active: this.active
            };
        },
        enumerable: true,
        configurable: true
    });
    Application.prototype.executeInitializers = function () {
        return this.initializer.initialize(this).then(function (result) {
            Logger_1.default.info("Application initialization complete");
        }).catch(function (err) {
            Logger_1.default.error("err", err);
        });
    };
    Application.prototype.buildConfiguration = function () {
        var _this = this;
        return this.configBuilder.build().then(function (config) {
            _this.config = config;
        });
    };
    return Application;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Application;
util.inherits(Application, LazyDependable.Container);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9hd3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxJQUFZLElBQUksV0FBTSxNQUFNLENBQUMsQ0FBQTtBQUc3QixJQUFZLGNBQWMsV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBRWxELHVCQUFtQiwyQkFBMkIsQ0FBQyxDQUFBO0FBSS9DLDJCQUF1QixxQkFBcUIsQ0FBQyxDQUFBO0FBRTdDLDhCQUE4QixxQkFBcUIsQ0FBQyxDQUFBO0FBYXBEO0lBb0JJLHFCQUFvQixXQUEyQixFQUFVLGFBQTRCO1FBQWpFLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBbkJyRixXQUFNLEdBQVksS0FBSyxDQUFDO1FBTXhCLFlBQU8sR0FBZSxJQUFJLG9CQUFVLEVBQUUsQ0FBQztRQWNuQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsNkJBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLDZCQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELHNCQUFJLGdDQUFPO2FBQVg7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ3pDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNkJBQUk7YUFBUjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwrQkFBTTthQUFWO1lBQ0ksTUFBTSxDQUFDO2dCQUNILElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUN0QixDQUFDO1FBQ04sQ0FBQzs7O09BQUE7SUFFRCx5Q0FBbUIsR0FBbkI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTTtZQUNqRCxnQkFBTSxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLEdBQUc7WUFDVCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsd0NBQWtCLEdBQWxCO1FBQUEsaUJBSUM7UUFIRyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFpQjtZQUNyRCxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxrQkFBQztBQUFELENBdkRBLEFBdURDLElBQUE7QUF2REQ7NkJBdURDLENBQUE7QUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMiLCJmaWxlIjoibGliL2F3dHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCAqIGFzIFByb21pc2UgZnJvbSBcImJsdWViaXJkXCI7XG5pbXBvcnQgKiBhcyBMYXp5RGVwZW5kYWJsZSBmcm9tIFwibGF6eS1kZXBlbmRhYmxlXCI7XG5pbXBvcnQgKiBhcyBUeXBlcyBmcm9tIFwiLi4vY29tcG9uZW50cy90eXBlcy9UeXBlc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vY29tcG9uZW50cy9sb2dzL0xvZ2dlclwiO1xuaW1wb3J0IEFwcEluaXRpYWxpemVyIGZyb20gXCIuLi9jb21wb25lbnRzL2ludGlhbGl6ZXIvQXBwbGljYXRpb25Jbml0aWFsaXplclwiO1xuaW1wb3J0IEFwcENvbmZpZyBmcm9tIFwiLi9jb25maWcvQXBwQ29uZmlnXCI7XG5pbXBvcnQgQ29uZmlnQnVpbGRlciBmcm9tIFwiLi9jb25maWcvQ29uZmlnQnVpbGRlclwiO1xuaW1wb3J0IE1vZHVsZUxpc3QgZnJvbSBcIi4vbW9kdWxlL01vZHVsZUxpc3RcIjtcbmltcG9ydCB7IElDb25maWcgfSBmcm9tIFwiLi9jb25maWcvSUNvbmZpZ1wiO1xuaW1wb3J0IHsgU2VydmVySGFuZGxlciB9IGZyb20gXCIuL2FwcC9TZXJ2ZXJIYW5kbGVyXCI7XG5cbmludGVyZmFjZSBJQXBwU3RhdHVzIHtcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIElFeHBvcnRhYmxlTW9kdWxlIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdmVyc2lvbj86IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb24ge1xuICAgIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIG9wdGlvbnM6IGFueTtcblxuICAgIGFwcDogZXhwcmVzcy5FeHByZXNzO1xuICAgIGNvbmZpZzogSUNvbmZpZztcblxuICAgIG1vZHVsZXM6IE1vZHVsZUxpc3QgPSBuZXcgTW9kdWxlTGlzdCgpO1xuICAgIGV4cG9ydGFibGVNb2R1bGVzOiBBcnJheTxJRXhwb3J0YWJsZU1vZHVsZT47XG5cbiAgICAvLyBTVEFSVDogc2lnbmF0dXJlcyBvZiBsYXp5LWRlcGVuZGFibGUgY29udGFpbmVyIG1ldGhvZHNcbiAgICByZWdpc3RlcjogKG5hbWU6IFR5cGVzLlN0cmluZ0Z1bmNPYmplY3QsIGNiPzogRnVuY3Rpb24gfCBhbnkpID0+IHZvaWQ7XG4gICAgcmVzb2x2ZTogKG5hbWU6IFR5cGVzLlN0cmluZ0Z1bmNPYmplY3QsIGNiPzogRnVuY3Rpb24pID0+IHZvaWQ7XG4gICAgZ2V0OiAobmFtZTogc3RyaW5nLCBjYjogRnVuY3Rpb24pID0+IHZvaWQ7XG4gICAgZGVzdHJveTogKCkgPT4gdm9pZDtcbiAgICByZXNvbHZlZDogVHlwZXMuTWFwO1xuICAgIC8vIEVORDogc2lnbmF0dXJlcyBvZiBsYXp5LWRlcGVuZGFibGUgY29udGFpbmVyIG1ldGhvZHNcblxuICAgIHNlcnZlOiAob3B0aW9uczogYW55LCBjYj86IChhcHBsaWNhdGlvbjogQXBwbGljYXRpb24pID0+IHZvaWQpID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluaXRpYWxpemVyOiBBcHBJbml0aWFsaXplciwgcHJpdmF0ZSBjb25maWdCdWlsZGVyOiBDb25maWdCdWlsZGVyKSB7XG4gICAgICAgIExhenlEZXBlbmRhYmxlLkNvbnRhaW5lci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLmV4cG9ydGFibGVNb2R1bGVzID0gW107XG4gICAgICAgIHRoaXMuc2VydmUgPSBTZXJ2ZXJIYW5kbGVyLnN0YXJ0U2VydmVyLmJpbmQoU2VydmVySGFuZGxlciwgdGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0IHZlcnNpb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmZyYW1ld29yay52ZXJzaW9uO1xuICAgIH1cblxuICAgIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5mcmFtZXdvcmsubmFtZTtcbiAgICB9XG5cbiAgICBnZXQgc3RhdHVzKCk6IElBcHBTdGF0dXMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgdmVyc2lvbjogdGhpcy52ZXJzaW9uLFxuICAgICAgICAgICAgYWN0aXZlOiB0aGlzLmFjdGl2ZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGV4ZWN1dGVJbml0aWFsaXplcnMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmluaXRpYWxpemVyLmluaXRpYWxpemUodGhpcykudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBMb2dnZXIuaW5mbyhcIkFwcGxpY2F0aW9uIGluaXRpYWxpemF0aW9uIGNvbXBsZXRlXCIpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJlcnJcIiwgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYnVpbGRDb25maWd1cmF0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWdCdWlsZGVyLmJ1aWxkKCkudGhlbigoY29uZmlnOiBBcHBDb25maWcpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbnV0aWwuaW5oZXJpdHMoQXBwbGljYXRpb24sIExhenlEZXBlbmRhYmxlLkNvbnRhaW5lcik7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
