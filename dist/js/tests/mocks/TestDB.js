"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Promise = require("bluebird");
var App = require("../../index");
var TestDB = (function (_super) {
    __extends(TestDB, _super);
    function TestDB() {
        _super.apply(this, arguments);
    }
    TestDB.prototype.connect = function () {
        var defer = Promise.defer();
        defer.resolve(true);
        return defer.promise;
    };
    TestDB.prototype.disconnect = function () {
        var defer = Promise.defer();
        defer.resolve(true);
        return defer.promise;
    };
    TestDB.prototype.isConnected = function () {
        return true;
    };
    TestDB.prototype.listen = function (name, cb) {
    };
    TestDB.prototype.updateModelStructure = function (model) {
    };
    TestDB.prototype.bindModelListeners = function (modelData, listeners) {
    };
    TestDB.prototype.registerModel = function (modelData) {
        return [modelData];
    };
    return TestDB;
}(App.Database));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TestDB;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RzL21vY2tzL1Rlc3REQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFZLE9BQU8sV0FBTSxVQUFVLENBQUMsQ0FBQTtBQUVwQyxJQUFZLEdBQUcsV0FBTSxhQUFhLENBQUMsQ0FBQTtBQVFuQztJQUFvQywwQkFBd0Q7SUFBNUY7UUFBb0MsOEJBQXdEO0lBNkI1RixDQUFDO0lBNUJHLHdCQUFPLEdBQVA7UUFDSSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRUQsMkJBQVUsR0FBVjtRQUNJLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFRCw0QkFBVyxHQUFYO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsdUJBQU0sR0FBTixVQUFPLElBQVksRUFBRSxFQUFZO0lBQ2pDLENBQUM7SUFFRCxxQ0FBb0IsR0FBcEIsVUFBcUIsS0FBa0I7SUFDdkMsQ0FBQztJQUVELG1DQUFrQixHQUFsQixVQUFtQixTQUFzQixFQUFFLFNBQWdDO0lBQzNFLENBQUM7SUFFRCw4QkFBYSxHQUFiLFVBQWMsU0FBc0I7UUFDaEMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQTdCQSxBQTZCQyxDQTdCbUMsR0FBRyxDQUFDLFFBQVEsR0E2Qi9DO0FBN0JEO3dCQTZCQyxDQUFBIiwiZmlsZSI6InRlc3RzL21vY2tzL1Rlc3REQi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFByb21pc2UgZnJvbSBcImJsdWViaXJkXCI7XG5pbXBvcnQgKiBhcyBUeXBlcyBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy90eXBlcy9UeXBlc1wiO1xuaW1wb3J0ICogYXMgQXBwIGZyb20gXCIuLi8uLi9pbmRleFwiO1xuXG5pbnRlcmZhY2UgVGVzdERiTW9kZWwgZXh0ZW5kcyBBcHAuSURiTW9kZWwge1xufVxuXG5pbnRlcmZhY2UgVGVzdERiQ29ubmVjdGlvbiB7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3REQiBleHRlbmRzIEFwcC5EYXRhYmFzZTxUZXN0RGJDb25uZWN0aW9uLCBUZXN0RGJNb2RlbCwgVGVzdERiTW9kZWw+IHtcbiAgICBjb25uZWN0KCk6IFByb21pc2U8e30+IHtcbiAgICAgICAgdmFyIGRlZmVyID0gUHJvbWlzZS5kZWZlcigpO1xuICAgICAgICBkZWZlci5yZXNvbHZlKHRydWUpO1xuICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KCk6IFByb21pc2U8e30+IHtcbiAgICAgICAgdmFyIGRlZmVyID0gUHJvbWlzZS5kZWZlcigpO1xuICAgICAgICBkZWZlci5yZXNvbHZlKHRydWUpO1xuICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICB9XG5cbiAgICBpc0Nvbm5lY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgbGlzdGVuKG5hbWU6IHN0cmluZywgY2I6IEZ1bmN0aW9uKTogdm9pZCB8IGFueSB7XG4gICAgfVxuXG4gICAgdXBkYXRlTW9kZWxTdHJ1Y3R1cmUobW9kZWw6IFRlc3REYk1vZGVsKSB7XG4gICAgfVxuXG4gICAgYmluZE1vZGVsTGlzdGVuZXJzKG1vZGVsRGF0YTogVGVzdERiTW9kZWwsIGxpc3RlbmVyczogQXJyYXk8VHlwZXMuTGlzdGVuZXI+KSB7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJNb2RlbChtb2RlbERhdGE6IFRlc3REYk1vZGVsKTogQXJyYXk8VGVzdERiTW9kZWw+IHtcbiAgICAgICAgcmV0dXJuIFttb2RlbERhdGFdO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
