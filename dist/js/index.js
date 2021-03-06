"use strict";
var Events_1 = require("./components/events/Events");
var StaticLogger_1 = require("./components/logs/StaticLogger");
var Module_1 = require("./lib/module/Module");
var ExpressServer_1 = require("./lib/server/ExpressServer");
var Database_1 = require("./components/database/Database");
var MongoDatabase_1 = require("./components/database/mongo/MongoDatabase");
exports.Module = Module_1.default;
exports.Events = Events_1.default;
exports.StaticLogger = StaticLogger_1.default;
exports.Database = Database_1.AppDatabase;
exports.Server = ExpressServer_1.default;
exports.MongoDB = MongoDatabase_1.default;
var ApplicationInitializer_1 = require("./components/intializer/ApplicationInitializer");
var ConfigBuilder_1 = require("./lib/config/ConfigBuilder");
var ModuleInitializer_1 = require("./lib/app/ModuleInitializer");
exports.configBuilder = new ConfigBuilder_1.default();
exports.initializer = new ApplicationInitializer_1.default();
exports.initializer.addInitializer(new ModuleInitializer_1.default());
var DbFactory_1 = require("./components/database/DbFactory");
var ServerEngineFactory_1 = require("./lib/server/ServerEngineFactory");
var ExpressConfigManager_1 = require("./lib/server/express/ExpressConfigManager");
exports.DatabaseFactory = DbFactory_1.default;
exports.ServerFactory = ServerEngineFactory_1.default;
exports.ExpressManager = ExpressConfigManager_1.default;
var awts_1 = require("./lib/awts");
exports.application = new awts_1.default(exports.initializer, exports.configBuilder);
var MongoDbDecorators = require("./components/database/mongo/decorators/MongoDecorators");
exports.MongoDecorators = MongoDbDecorators;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPQSx1QkFBdUIsNEJBQTRCLENBQUMsQ0FBQTtBQUNwRCw2QkFBdUIsZ0NBQWdDLENBQUMsQ0FBQTtBQUN4RCx1QkFBdUIscUJBQXFCLENBQUMsQ0FBQTtBQUM3Qyw4QkFBMEIsNEJBQTRCLENBQUMsQ0FBQTtBQUN2RCx5QkFBNEIsZ0NBQWdDLENBQUMsQ0FBQTtBQUM3RCw4QkFBMEIsMkNBQTJDLENBQUMsQ0FBQTtBQUMzRCxjQUFNLEdBQUcsZ0JBQVUsQ0FBQztBQUNwQixjQUFNLEdBQUcsZ0JBQVUsQ0FBQztBQUNwQixvQkFBWSxHQUFHLHNCQUFVLENBQUM7QUFDMUIsZ0JBQVEsR0FBRyxzQkFBVyxDQUFDO0FBQ3ZCLGNBQU0sR0FBRyx1QkFBYSxDQUFDO0FBQ3ZCLGVBQU8sR0FBRyx1QkFBYSxDQUFDO0FBR25DLHVDQUEyQixnREFBZ0QsQ0FBQyxDQUFBO0FBQzVFLDhCQUEwQiw0QkFBNEIsQ0FBQyxDQUFBO0FBQ3ZELGtDQUE4Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBQ2pELHFCQUFhLEdBQWtCLElBQUksdUJBQWEsRUFBRSxDQUFDO0FBQ25ELG1CQUFXLEdBQW1CLElBQUksZ0NBQWMsRUFBRSxDQUFDO0FBQzlELG1CQUFXLENBQUMsY0FBYyxDQUFDLElBQUksMkJBQWlCLEVBQUUsQ0FBQyxDQUFDO0FBRXBELDBCQUFzQixpQ0FBaUMsQ0FBQyxDQUFBO0FBQ3hELG9DQUFnQyxrQ0FBa0MsQ0FBQyxDQUFBO0FBQ25FLHFDQUFpQywyQ0FBMkMsQ0FBQyxDQUFBO0FBQ2xFLHVCQUFlLEdBQUcsbUJBQVMsQ0FBQztBQUM1QixxQkFBYSxHQUFHLDZCQUFtQixDQUFDO0FBQ3BDLHNCQUFjLEdBQUcsOEJBQW9CLENBQUM7QUFHakQscUJBQXdCLFlBQVksQ0FBQyxDQUFBO0FBQzFCLG1CQUFXLEdBQWdCLElBQUksY0FBVyxDQUFDLG1CQUFXLEVBQUUscUJBQWEsQ0FBQyxDQUFDO0FBY2xGLElBQVksaUJBQWlCLFdBQU0sd0RBQXdELENBQUMsQ0FBQTtBQUNqRix1QkFBZSxHQUFHLGlCQUFpQixDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInR5cGluZ3MvZGVwZW5kYWJsZS5kLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ0eXBpbmdzL2RlcGVuZGFibGVMaXN0LmQudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInR5cGluZ3MvbGF6eURlcGVuZGFibGUuZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwidHlwaW5ncy9hcnJheS5kLnRzXCIgLz5cblxuLy8gY2xhc3Nlc1xuaW1wb3J0IEF3dHNFdmVudHMgZnJvbSBcIi4vY29tcG9uZW50cy9ldmVudHMvRXZlbnRzXCI7XG5pbXBvcnQgQXd0c0xvZ2dlciBmcm9tIFwiLi9jb21wb25lbnRzL2xvZ3MvU3RhdGljTG9nZ2VyXCI7XG5pbXBvcnQgQXd0c01vZHVsZSBmcm9tIFwiLi9saWIvbW9kdWxlL01vZHVsZVwiO1xuaW1wb3J0IEV4cHJlc3NTZXJ2ZXIgZnJvbSBcIi4vbGliL3NlcnZlci9FeHByZXNzU2VydmVyXCI7XG5pbXBvcnQgeyBBcHBEYXRhYmFzZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvZGF0YWJhc2UvRGF0YWJhc2VcIjtcbmltcG9ydCBNb25nb0RhdGFiYXNlIGZyb20gXCIuL2NvbXBvbmVudHMvZGF0YWJhc2UvbW9uZ28vTW9uZ29EYXRhYmFzZVwiO1xuZXhwb3J0IHZhciBNb2R1bGUgPSBBd3RzTW9kdWxlO1xuZXhwb3J0IHZhciBFdmVudHMgPSBBd3RzRXZlbnRzO1xuZXhwb3J0IHZhciBTdGF0aWNMb2dnZXIgPSBBd3RzTG9nZ2VyO1xuZXhwb3J0IHZhciBEYXRhYmFzZSA9IEFwcERhdGFiYXNlO1xuZXhwb3J0IHZhciBTZXJ2ZXIgPSBFeHByZXNzU2VydmVyO1xuZXhwb3J0IHZhciBNb25nb0RCID0gTW9uZ29EYXRhYmFzZTtcblxuLy8gYnVpbGRlcnMgJiBmYWN0b3JpZXNcbmltcG9ydCBBcHBJbml0aWFsaXplciBmcm9tIFwiLi9jb21wb25lbnRzL2ludGlhbGl6ZXIvQXBwbGljYXRpb25Jbml0aWFsaXplclwiO1xuaW1wb3J0IENvbmZpZ0J1aWxkZXIgZnJvbSBcIi4vbGliL2NvbmZpZy9Db25maWdCdWlsZGVyXCI7XG5pbXBvcnQgTW9kdWxlSW5pdGlhbGl6ZXIgZnJvbSBcIi4vbGliL2FwcC9Nb2R1bGVJbml0aWFsaXplclwiO1xuZXhwb3J0IHZhciBjb25maWdCdWlsZGVyOiBDb25maWdCdWlsZGVyID0gbmV3IENvbmZpZ0J1aWxkZXIoKTtcbmV4cG9ydCB2YXIgaW5pdGlhbGl6ZXI6IEFwcEluaXRpYWxpemVyID0gbmV3IEFwcEluaXRpYWxpemVyKCk7XG5pbml0aWFsaXplci5hZGRJbml0aWFsaXplcihuZXcgTW9kdWxlSW5pdGlhbGl6ZXIoKSk7XG5cbmltcG9ydCBEYkZhY3RvcnkgZnJvbSBcIi4vY29tcG9uZW50cy9kYXRhYmFzZS9EYkZhY3RvcnlcIjtcbmltcG9ydCBTZXJ2ZXJFbmdpbmVGYWN0b3J5IGZyb20gXCIuL2xpYi9zZXJ2ZXIvU2VydmVyRW5naW5lRmFjdG9yeVwiO1xuaW1wb3J0IEV4cHJlc3NDb25maWdNYW5hZ2VyIGZyb20gXCIuL2xpYi9zZXJ2ZXIvZXhwcmVzcy9FeHByZXNzQ29uZmlnTWFuYWdlclwiO1xuZXhwb3J0IHZhciBEYXRhYmFzZUZhY3RvcnkgPSBEYkZhY3Rvcnk7XG5leHBvcnQgdmFyIFNlcnZlckZhY3RvcnkgPSBTZXJ2ZXJFbmdpbmVGYWN0b3J5O1xuZXhwb3J0IHZhciBFeHByZXNzTWFuYWdlciA9IEV4cHJlc3NDb25maWdNYW5hZ2VyO1xuXG4vLyBhcHBsaWNhdGlvblxuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gXCIuL2xpYi9hd3RzXCI7XG5leHBvcnQgdmFyIGFwcGxpY2F0aW9uOiBBcHBsaWNhdGlvbiA9IG5ldyBBcHBsaWNhdGlvbihpbml0aWFsaXplciwgY29uZmlnQnVpbGRlcik7XG5cbi8vIHR5cGVzXG5leHBvcnQgdHlwZSBDb25maWd1cmF0aW9uID0gdHlwZW9mIGFwcGxpY2F0aW9uLmNvbmZpZztcblxuLy8gaW50ZXJmYWNlc1xuZXhwb3J0ICogZnJvbSBcIi4vY29tcG9uZW50cy9pbnRpYWxpemVyL0lBcHBJbml0aWFsaXplclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vY29tcG9uZW50cy9kYXRhYmFzZS9JRGJNb2RlbFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vY29tcG9uZW50cy9kYXRhYmFzZS9tb25nby9Nb25nb01vZGVsXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9saWIvY29uZmlnL0lDb25maWdCdWlsZGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9saWIvc2VydmVyL0lTZXJ2ZXJFbmdpbmVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2xpYi9zZXJ2ZXIvZXhwcmVzcy9JRXhwcmVzc0NvbmZpZ1wiO1xuXG4vLyBkZWNvcmF0b3JzXG5pbXBvcnQgKiBhcyBNb25nb0RiRGVjb3JhdG9ycyBmcm9tIFwiLi9jb21wb25lbnRzL2RhdGFiYXNlL21vbmdvL2RlY29yYXRvcnMvTW9uZ29EZWNvcmF0b3JzXCI7XG5leHBvcnQgdmFyIE1vbmdvRGVjb3JhdG9ycyA9IE1vbmdvRGJEZWNvcmF0b3JzO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
