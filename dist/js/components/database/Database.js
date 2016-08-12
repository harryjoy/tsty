"use strict";
var _ = require("lodash");
var Promise = require("bluebird");
var AppDatabase = (function () {
    function AppDatabase(url, prefix, options) {
        this.url = url;
        this.prefix = prefix;
        if (options) {
            this.options = _.merge(this.options, options);
        }
        else {
            this.options = {};
        }
        this.reset();
    }
    Object.defineProperty(AppDatabase.prototype, "connection", {
        get: function () {
            return this.dbConnection;
        },
        set: function (connection) {
            this.dbConnection = connection;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    AppDatabase.prototype.reset = function () {
        this.disconnect();
        this.connection = null;
        this.models = {};
    };
    AppDatabase.prototype.registerModelPostSteps = function (key, model) {
        Promise.promisifyAll(model);
        Promise.promisifyAll(model["prototype"]);
        this.models[key] = model;
    };
    AppDatabase.prototype.isModelExistInModels = function (key) {
        return !!this.models[key];
    };
    AppDatabase.prototype.getModel = function (key) {
        return this.models[key];
    };
    return AppDatabase;
}());
exports.AppDatabase = AppDatabase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0YWJhc2UvRGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBQzVCLElBQVksT0FBTyxXQUFNLFVBQVUsQ0FBQyxDQUFBO0FBSXBDO0lBTUkscUJBQXNCLEdBQVcsRUFBWSxNQUFjLEVBQUUsT0FBUTtRQUEvQyxRQUFHLEdBQUgsR0FBRyxDQUFRO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUN2RCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsc0JBQUksbUNBQVU7YUFBZDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7YUFFRCxVQUFlLFVBQWE7WUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUM7UUFDbkMsQ0FBQzs7O09BSkE7OztJQU1ELDJCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQVVELDRDQUFzQixHQUF0QixVQUF1QixHQUFXLEVBQUUsS0FBUTtRQUN4QyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVELDBDQUFvQixHQUFwQixVQUFxQixHQUFXO1FBQzVCLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLEdBQVc7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FsREEsQUFrREMsSUFBQTtBQWxEcUIsbUJBQVcsY0FrRGhDLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9kYXRhYmFzZS9EYXRhYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0ICogYXMgUHJvbWlzZSBmcm9tIFwiYmx1ZWJpcmRcIjtcbmltcG9ydCAqIGFzIFR5cGVzIGZyb20gXCIuLi90eXBlcy9UeXBlc1wiO1xuaW1wb3J0IHsgSURiTW9kZWwgfSBmcm9tIFwiLi9JRGJNb2RlbFwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXBwRGF0YWJhc2U8VCwgVSBleHRlbmRzIElEYk1vZGVsLCBaPiB7XG4gICAgcHJvdGVjdGVkIG1vZGVsczogVHlwZXMuTWFwO1xuICAgIHByb3RlY3RlZCBvcHRpb25zOiBhbnk7XG5cbiAgICBwcml2YXRlIGRiQ29ubmVjdGlvbjogVDtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB1cmw6IHN0cmluZywgcHJvdGVjdGVkIHByZWZpeDogc3RyaW5nLCBvcHRpb25zPykge1xuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gXy5tZXJnZSh0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0ge307XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cblxuICAgIGdldCBjb25uZWN0aW9uKCk6IFQge1xuICAgICAgICByZXR1cm4gdGhpcy5kYkNvbm5lY3Rpb247XG4gICAgfTtcblxuICAgIHNldCBjb25uZWN0aW9uKGNvbm5lY3Rpb246IFQpIHtcbiAgICAgICAgdGhpcy5kYkNvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xuICAgIH07XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMubW9kZWxzID0ge307XG4gICAgfVxuXG4gICAgYWJzdHJhY3QgY29ubmVjdCgpOiBQcm9taXNlPHt9PjtcbiAgICBhYnN0cmFjdCBkaXNjb25uZWN0KCk6IFByb21pc2U8e30+O1xuICAgIGFic3RyYWN0IGlzQ29ubmVjdGVkKCk6IGJvb2xlYW47XG4gICAgYWJzdHJhY3QgbGlzdGVuKG5hbWU6IHN0cmluZywgY2I6IEZ1bmN0aW9uKTogdm9pZCB8IGFueTtcbiAgICBhYnN0cmFjdCB1cGRhdGVNb2RlbFN0cnVjdHVyZShtb2RlbDogVSk7XG4gICAgYWJzdHJhY3QgYmluZE1vZGVsTGlzdGVuZXJzKG1vZGVsRGF0YTogVSwgbGlzdGVuZXJzOiBBcnJheTxUeXBlcy5MaXN0ZW5lcj4pO1xuICAgIGFic3RyYWN0IHJlZ2lzdGVyTW9kZWwobW9kZWxEYXRhOiBVKTogQXJyYXk8Wj47XG5cbiAgICByZWdpc3Rlck1vZGVsUG9zdFN0ZXBzKGtleTogc3RyaW5nLCBtb2RlbDogWikge1xuICAgICAgICBQcm9taXNlLnByb21pc2lmeUFsbChtb2RlbCk7XG4gICAgICAgIFByb21pc2UucHJvbWlzaWZ5QWxsKG1vZGVsW1wicHJvdG90eXBlXCJdKTtcbiAgICAgICAgdGhpcy5tb2RlbHNba2V5XSA9IG1vZGVsO1xuICAgIH1cblxuICAgIGlzTW9kZWxFeGlzdEluTW9kZWxzKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMubW9kZWxzW2tleV07XG4gICAgfVxuXG4gICAgZ2V0TW9kZWwoa2V5OiBzdHJpbmcpOiBaIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW2tleV07XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
