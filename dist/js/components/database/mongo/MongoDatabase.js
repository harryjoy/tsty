"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mongoose = require("mongoose");
var Promise = require("bluebird");
var _ = require("lodash");
var Logger_1 = require("../../logs/Logger");
var Constants_1 = require("../Constants");
var ModuleConfig_1 = require("../../../lib/module/ModuleConfig");
var Database_1 = require("../Database");
var index_1 = require("../../../index");
var MongoDatabase = (function (_super) {
    __extends(MongoDatabase, _super);
    function MongoDatabase(url, prefix, options) {
        _super.call(this, url, prefix, options);
        mongoose.set("debug", options && options.mongoose && options.mongoose.debug);
        this.connectionPool = {};
    }
    MongoDatabase.prototype.connect = function () {
        var defer = Promise.defer();
        this.openNewConnection(this.url, this.options)
            .then(this.onDefaultConnectionOpen.bind(this, defer))
            .catch(function (err) {
            defer.reject(err);
        });
        return defer.promise;
    };
    MongoDatabase.prototype.disconnect = function () {
        var _this = this;
        var defer = Promise.defer();
        if (!this.isConnected()) {
            Logger_1.default.info("No connection is opened to close.");
            return;
        }
        this.connection.close();
        this.connection.once("disconnect", function () {
            _this.reset();
            defer.resolve({
                disconnected: true
            });
        });
        this.connection.once("error", function (err) {
            defer.reject(err);
        });
        return defer.promise;
    };
    MongoDatabase.prototype.isConnected = function () {
        return this.getConnectionReadyState() === Constants_1.default.connStats["CONNECTED"];
    };
    MongoDatabase.prototype.listen = function (name, cb) {
        this.connection.on(name, cb);
    };
    MongoDatabase.prototype.updateModelStructure = function (model) {
        model.fields = _.merge({}, model.fields);
        model.methods = _.merge({}, model.methods);
        model.statics = _.merge({}, model.statics);
    };
    MongoDatabase.prototype.bindModelListeners = function (model, listeners) {
    };
    MongoDatabase.prototype.registerModel = function (modelData) {
        var found = this.isModelExistInModels(modelData.name);
        if (found) {
            return;
        }
        var schema = modelData.schema;
        var colllection = modelData.collection;
        if (this.prefix) {
            colllection = this.prefix + "_" + colllection;
        }
        var dbModels = [];
        for (var _i = 0, _a = modelData.dbs; _i < _a.length; _i++) {
            var db = _a[_i];
            dbModels.push(this.createDbModel(db, modelData.name, schema, colllection));
        }
        return dbModels;
    };
    MongoDatabase.prototype.getConnectionReadyState = function () {
        return this.connection ? this.connection.readyState : -1;
    };
    MongoDatabase.prototype.onDefaultConnectionOpen = function (defer, result) {
        this.connection = result.connection;
        var config = index_1.application.config;
        var promises = [];
        if (config.dbOptions.dbs && config.dbOptions.dbs.length > 0) {
            for (var i in config.dbOptions.dbs) {
                promises.push(this.openNewConnection(config.dbOptions.dbs[i], _.merge(this.options || {}, {
                    alias: i
                })));
            }
        }
        Promise.all(promises).then(this.databaseReady.bind(this, defer));
    };
    MongoDatabase.prototype.databaseReady = function (defer, connectionPool) {
        for (var _i = 0, connectionPool_1 = connectionPool; _i < connectionPool_1.length; _i++) {
            var conn = connectionPool_1[_i];
            if (conn.state !== "fulfilled") {
                continue;
            }
            this.connectionPool[conn.value.alias] = conn.value.connection;
        }
        defer.resolve();
    };
    MongoDatabase.prototype.openNewConnection = function (url, options) {
        var defer = Promise.defer();
        var connection = mongoose.createConnection(url, options);
        connection.once("connected", function () {
            defer.resolve({
                uri: url,
                alias: options.alias,
                connection: connection
            });
        });
        connection.once("error", function (err) {
            defer.reject(err);
        });
        return defer.promise;
    };
    MongoDatabase.prototype.createDbModel = function (alias, name, schema, colllection) {
        var model;
        var connection = this.getMongoConnectionByAlias(alias);
        if (connection) {
            if (colllection) {
                model = connection.model(name, schema, colllection);
            }
            else {
                model = connection.model(name, schema);
            }
        }
        return model;
    };
    MongoDatabase.prototype.getMongoConnectionByAlias = function (alias) {
        if (alias === ModuleConfig_1.default.DEFAULT_DB_NAME || !this.connectionPool[alias]) {
            return this.connection;
        }
        return this.connectionPool[alias];
    };
    MongoDatabase.prototype.isConnectionOpenForAlias = function (alias) {
        return (alias === ModuleConfig_1.default.DEFAULT_DB_NAME) || !!this.connectionPool[alias];
    };
    return MongoDatabase;
}(Database_1.AppDatabase));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MongoDatabase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0YWJhc2UvbW9uZ28vTW9uZ29EYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFZLFFBQVEsV0FBTSxVQUFVLENBQUMsQ0FBQTtBQUNyQyxJQUFZLE9BQU8sV0FBTSxVQUFVLENBQUMsQ0FBQTtBQUNwQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qix1QkFBbUIsbUJBQW1CLENBQUMsQ0FBQTtBQUN2QywwQkFBc0IsY0FBYyxDQUFDLENBQUE7QUFDckMsNkJBQXlCLGtDQUFrQyxDQUFDLENBQUE7QUFFNUQseUJBQTRCLGFBQWEsQ0FBQyxDQUFBO0FBQzFDLHNCQUE0QixnQkFBZ0IsQ0FBQyxDQUFBO0FBYTdDO0lBQTJDLGlDQUFpRTtJQUd4Ryx1QkFBWSxHQUFXLEVBQUUsTUFBYyxFQUFFLE9BQVE7UUFDN0Msa0JBQU0sR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1QixRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCwrQkFBTyxHQUFQO1FBQ0ksSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3BELEtBQUssQ0FBQyxVQUFDLEdBQUc7WUFDUCxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsTUFB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LENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDZCxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBTSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzdELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBTSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDaEQsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTyxpREFBeUIsR0FBakMsVUFBa0MsS0FBYTtRQUMzQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssc0JBQVksQ0FBQyxlQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVPLGdEQUF3QixHQUFoQyxVQUFpQyxLQUFhO1FBQzFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssS0FBSyxzQkFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFDTCxvQkFBQztBQUFELENBMUlBLEFBMElDLENBMUkwQyxzQkFBVyxHQTBJckQ7QUExSUQ7K0JBMElDLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9kYXRhYmFzZS9tb25nby9Nb25nb0RhdGFiYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XG5pbXBvcnQgKiBhcyBQcm9taXNlIGZyb20gXCJibHVlYmlyZFwiO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgKiBhcyBUeXBlcyBmcm9tIFwiLi4vLi4vdHlwZXMvVHlwZXNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uLy4uL2xvZ3MvTG9nZ2VyXCI7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCBNb2R1bGVDb25maWcgZnJvbSBcIi4uLy4uLy4uL2xpYi9tb2R1bGUvTW9kdWxlQ29uZmlnXCI7XG5pbXBvcnQgeyBNb25nb01vZGVsIH0gZnJvbSBcIi4vTW9uZ29Nb2RlbFwiO1xuaW1wb3J0IHsgQXBwRGF0YWJhc2UgfSBmcm9tIFwiLi4vRGF0YWJhc2VcIjtcbmltcG9ydCB7IGFwcGxpY2F0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2luZGV4XCI7XG5cbmludGVyZmFjZSBJQ29ubmVjdGlvblJlc29sdmVyIHtcbiAgICB1cmk6IHN0cmluZztcbiAgICBjb25uZWN0aW9uOiBtb25nb29zZS5Db25uZWN0aW9uO1xuICAgIGFsaWFzPzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgSUNvbm5lY3Rpb25Qb29sRW50aXR5IHtcbiAgICBzdGF0ZTogc3RyaW5nO1xuICAgIHZhbHVlOiBJQ29ubmVjdGlvblJlc29sdmVyXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbmdvRGF0YWJhc2UgZXh0ZW5kcyBBcHBEYXRhYmFzZTxtb25nb29zZS5Db25uZWN0aW9uLCBNb25nb01vZGVsLCBtb25nb29zZS5Nb2RlbDxhbnk+PiB7XG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uUG9vbDogVHlwZXMuTWFwO1xuXG4gICAgY29uc3RydWN0b3IodXJsOiBzdHJpbmcsIHByZWZpeDogc3RyaW5nLCBvcHRpb25zPykge1xuICAgICAgICBzdXBlcih1cmwsIHByZWZpeCwgb3B0aW9ucyk7XG4gICAgICAgIG1vbmdvb3NlLnNldChcImRlYnVnXCIsIG9wdGlvbnMgJiYgb3B0aW9ucy5tb25nb29zZSAmJiBvcHRpb25zLm1vbmdvb3NlLmRlYnVnKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uUG9vbCA9IHt9O1xuICAgIH1cblxuICAgIGNvbm5lY3QoKTogUHJvbWlzZTx7fT4ge1xuICAgICAgICBjb25zdCBkZWZlciA9IFByb21pc2UuZGVmZXIoKTtcbiAgICAgICAgdGhpcy5vcGVuTmV3Q29ubmVjdGlvbih0aGlzLnVybCwgdGhpcy5vcHRpb25zKVxuICAgICAgICAgICAgLnRoZW4odGhpcy5vbkRlZmF1bHRDb25uZWN0aW9uT3Blbi5iaW5kKHRoaXMsIGRlZmVyKSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKT0+IHtcbiAgICAgICAgICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KCk6IFByb21pc2U8e30+IHtcbiAgICAgICAgY29uc3QgZGVmZXIgPSBQcm9taXNlLmRlZmVyKCk7XG4gICAgICAgIGlmICghdGhpcy5pc0Nvbm5lY3RlZCgpKSB7XG4gICAgICAgICAgICBMb2dnZXIuaW5mbyhcIk5vIGNvbm5lY3Rpb24gaXMgb3BlbmVkIHRvIGNsb3NlLlwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uY2UoXCJkaXNjb25uZWN0XCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoe1xuICAgICAgICAgICAgICAgIGRpc2Nvbm5lY3RlZDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25jZShcImVycm9yXCIsIChlcnIpID0+IHtcbiAgICAgICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgfVxuXG4gICAgaXNDb25uZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbm5lY3Rpb25SZWFkeVN0YXRlKCkgPT09IENvbnN0YW50cy5jb25uU3RhdHNbXCJDT05ORUNURURcIl07XG4gICAgfVxuXG4gICAgbGlzdGVuKG5hbWU6IHN0cmluZywgY2I6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbihuYW1lLCBjYik7XG4gICAgfVxuXG4gICAgdXBkYXRlTW9kZWxTdHJ1Y3R1cmUobW9kZWw6IE1vbmdvTW9kZWwpIHtcbiAgICAgICAgbW9kZWwuZmllbGRzID0gXy5tZXJnZSh7fSwgbW9kZWwuZmllbGRzKTtcbiAgICAgICAgbW9kZWwubWV0aG9kcyA9IF8ubWVyZ2Uoe30sIG1vZGVsLm1ldGhvZHMpO1xuICAgICAgICBtb2RlbC5zdGF0aWNzID0gXy5tZXJnZSh7fSwgbW9kZWwuc3RhdGljcyk7XG4gICAgfVxuXG4gICAgYmluZE1vZGVsTGlzdGVuZXJzKG1vZGVsOiBNb25nb01vZGVsLCBsaXN0ZW5lcnM6IEFycmF5PFR5cGVzLkxpc3RlbmVyPikge1xuICAgIH1cblxuICAgIHJlZ2lzdGVyTW9kZWwobW9kZWxEYXRhOiBNb25nb01vZGVsKTogQXJyYXk8bW9uZ29vc2UuTW9kZWw8YW55Pj4ge1xuICAgICAgICBjb25zdCBmb3VuZCA9IHRoaXMuaXNNb2RlbEV4aXN0SW5Nb2RlbHMobW9kZWxEYXRhLm5hbWUpO1xuICAgICAgICBpZiAoZm91bmQpIHsgcmV0dXJuOyB9XG4gICAgICAgIGNvbnN0IHNjaGVtYSA9IG1vZGVsRGF0YS5zY2hlbWE7XG4gICAgICAgIGxldCBjb2xsbGVjdGlvbiA9IG1vZGVsRGF0YS5jb2xsZWN0aW9uO1xuICAgICAgICBpZiAodGhpcy5wcmVmaXgpIHtcbiAgICAgICAgICAgIGNvbGxsZWN0aW9uID0gdGhpcy5wcmVmaXggKyBcIl9cIiArIGNvbGxsZWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkYk1vZGVsczogQXJyYXk8bW9uZ29vc2UuTW9kZWw8YW55Pj4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgZGIgb2YgbW9kZWxEYXRhLmRicykge1xuICAgICAgICAgICAgZGJNb2RlbHMucHVzaCh0aGlzLmNyZWF0ZURiTW9kZWwoZGIsIG1vZGVsRGF0YS5uYW1lLCBzY2hlbWEsIGNvbGxsZWN0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRiTW9kZWxzO1xuICAgIH1cblxuICAgIGdldENvbm5lY3Rpb25SZWFkeVN0YXRlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24gPyB0aGlzLmNvbm5lY3Rpb24ucmVhZHlTdGF0ZSA6IC0xO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25EZWZhdWx0Q29ubmVjdGlvbk9wZW4oZGVmZXI6IFByb21pc2UuUmVzb2x2ZXI8e30+LCByZXN1bHQ6IElDb25uZWN0aW9uUmVzb2x2ZXIpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gcmVzdWx0LmNvbm5lY3Rpb247XG5cbiAgICAgICAgbGV0IGNvbmZpZyA9IGFwcGxpY2F0aW9uLmNvbmZpZztcbiAgICAgICAgbGV0IHByb21pc2VzID0gW107XG4gICAgICAgIGlmIChjb25maWcuZGJPcHRpb25zLmRicyAmJiBjb25maWcuZGJPcHRpb25zLmRicy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGNvbmZpZy5kYk9wdGlvbnMuZGJzKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLm9wZW5OZXdDb25uZWN0aW9uKGNvbmZpZy5kYk9wdGlvbnMuZGJzW2ldLCBfLm1lcmdlKHRoaXMub3B0aW9ucyB8fCB7fSwge1xuICAgICAgICAgICAgICAgICAgICBhbGlhczogaVxuICAgICAgICAgICAgICAgIH0pKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4odGhpcy5kYXRhYmFzZVJlYWR5LmJpbmQodGhpcywgZGVmZXIpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRhdGFiYXNlUmVhZHkoZGVmZXI6IFByb21pc2UuUmVzb2x2ZXI8e30+LCBjb25uZWN0aW9uUG9vbDogQXJyYXk8SUNvbm5lY3Rpb25Qb29sRW50aXR5Pikge1xuICAgICAgICBmb3IgKGxldCBjb25uIG9mIGNvbm5lY3Rpb25Qb29sKSB7XG4gICAgICAgICAgICBpZiAoY29ubi5zdGF0ZSAhPT0gXCJmdWxmaWxsZWRcIikge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uUG9vbFtjb25uLnZhbHVlLmFsaWFzXSA9IGNvbm4udmFsdWUuY29ubmVjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcGVuTmV3Q29ubmVjdGlvbih1cmw6IHN0cmluZywgb3B0aW9ucz8pOiBQcm9taXNlPElDb25uZWN0aW9uUmVzb2x2ZXIgfCB7fT4ge1xuICAgICAgICBjb25zdCBkZWZlciA9IFByb21pc2UuZGVmZXIoKTtcbiAgICAgICAgbGV0IGNvbm5lY3Rpb24gPSBtb25nb29zZS5jcmVhdGVDb25uZWN0aW9uKHVybCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbm5lY3Rpb24ub25jZShcImNvbm5lY3RlZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBkZWZlci5yZXNvbHZlKHtcbiAgICAgICAgICAgICAgICB1cmk6IHVybCxcbiAgICAgICAgICAgICAgICBhbGlhczogb3B0aW9ucy5hbGlhcyxcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uOiBjb25uZWN0aW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbm5lY3Rpb24ub25jZShcImVycm9yXCIsIChlcnIpID0+IHtcbiAgICAgICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVEYk1vZGVsKGFsaWFzOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgc2NoZW1hOiBtb25nb29zZS5TY2hlbWEsIGNvbGxsZWN0aW9uOiBzdHJpbmcpOiBtb25nb29zZS5Nb2RlbDxhbnk+IHtcbiAgICAgICAgbGV0IG1vZGVsOiBtb25nb29zZS5Nb2RlbDxhbnk+O1xuICAgICAgICBsZXQgY29ubmVjdGlvbiA9IHRoaXMuZ2V0TW9uZ29Db25uZWN0aW9uQnlBbGlhcyhhbGlhcyk7XG4gICAgICAgIGlmIChjb25uZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoY29sbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBtb2RlbCA9IGNvbm5lY3Rpb24ubW9kZWw8YW55PihuYW1lLCBzY2hlbWEsIGNvbGxsZWN0aW9uKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbW9kZWwgPSBjb25uZWN0aW9uLm1vZGVsPGFueT4obmFtZSwgc2NoZW1hKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbW9kZWw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRNb25nb0Nvbm5lY3Rpb25CeUFsaWFzKGFsaWFzOiBzdHJpbmcpOiBtb25nb29zZS5Db25uZWN0aW9uIHtcbiAgICAgICAgaWYgKGFsaWFzID09PSBNb2R1bGVDb25maWcuREVGQVVMVF9EQl9OQU1FIHx8ICF0aGlzLmNvbm5lY3Rpb25Qb29sW2FsaWFzXSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uUG9vbFthbGlhc107XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0Nvbm5lY3Rpb25PcGVuRm9yQWxpYXMoYWxpYXM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKGFsaWFzID09PSBNb2R1bGVDb25maWcuREVGQVVMVF9EQl9OQU1FKSB8fCAhIXRoaXMuY29ubmVjdGlvblBvb2xbYWxpYXNdO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
