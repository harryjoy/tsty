"use strict";
var MongoDatabase_1 = require("../../components/database/mongo/MongoDatabase");
var DbFactory = (function () {
    function DbFactory() {
    }
    DbFactory.registerDbEngine = function (name, dbEngine) {
        this.dbs[name] = dbEngine;
    };
    DbFactory.produceDatabaseEngine = function (dbName, dbConnectionOptions) {
        var dbConstuct = this.dbs[dbName];
        if (!dbConstuct) {
            throw "No DB Engine found for name: " + dbName;
        }
        return new dbConstuct(dbConnectionOptions.url, dbConnectionOptions.prefix, dbConnectionOptions.options);
    };
    DbFactory.dbs = {
        mongo: MongoDatabase_1.default
    };
    return DbFactory;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DbFactory;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0YWJhc2UvRGJGYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSw4QkFBMEIsK0NBQStDLENBQUMsQ0FBQTtBQUcxRTtJQUFBO0lBZ0JBLENBQUM7SUFYVSwwQkFBZ0IsR0FBdkIsVUFBd0IsSUFBWSxFQUFFLFFBQTJCO1FBQzdELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDO0lBQzlCLENBQUM7SUFFTSwrQkFBcUIsR0FBNUIsVUFBNkIsTUFBYyxFQUFFLG1CQUF3QztRQUNqRixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNkLE1BQU0sK0JBQStCLEdBQUcsTUFBTSxDQUFDO1FBQ25ELENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBZGMsYUFBRyxHQUFjO1FBQzVCLEtBQUssRUFBRSx1QkFBYTtLQUN2QixDQUFDO0lBYU4sZ0JBQUM7QUFBRCxDQWhCQSxBQWdCQyxJQUFBO0FBaEJEOzJCQWdCQyxDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvZGF0YWJhc2UvRGJGYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVHlwZXMgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvdHlwZXMvVHlwZXNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvbG9ncy9Mb2dnZXJcIjtcbmltcG9ydCBNb25nb0RhdGFiYXNlIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL2RhdGFiYXNlL21vbmdvL01vbmdvRGF0YWJhc2VcIjtcbmltcG9ydCB7IEFwcERhdGFiYXNlIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvZGF0YWJhc2UvRGF0YWJhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGJGYWN0b3J5IHtcbiAgICBwcml2YXRlIHN0YXRpYyBkYnM6IFR5cGVzLk1hcCA9IHtcbiAgICAgICAgbW9uZ286IE1vbmdvRGF0YWJhc2VcbiAgICB9O1xuXG4gICAgc3RhdGljIHJlZ2lzdGVyRGJFbmdpbmUobmFtZTogc3RyaW5nLCBkYkVuZ2luZTogVHlwZXMuQXBwRGF0YWJhc2UpIHtcbiAgICAgICAgdGhpcy5kYnNbbmFtZV0gPSBkYkVuZ2luZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvZHVjZURhdGFiYXNlRW5naW5lKGRiTmFtZTogc3RyaW5nLCBkYkNvbm5lY3Rpb25PcHRpb25zOiBUeXBlcy5EYkNvbm5PcHRpb25zKTogVHlwZXMuQXBwRGF0YWJhc2Uge1xuICAgICAgICB2YXIgZGJDb25zdHVjdCA9IHRoaXMuZGJzW2RiTmFtZV07XG4gICAgICAgIGlmICghZGJDb25zdHVjdCkge1xuICAgICAgICAgICAgdGhyb3cgXCJObyBEQiBFbmdpbmUgZm91bmQgZm9yIG5hbWU6IFwiICsgZGJOYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgZGJDb25zdHVjdChkYkNvbm5lY3Rpb25PcHRpb25zLnVybCwgZGJDb25uZWN0aW9uT3B0aW9ucy5wcmVmaXgsIGRiQ29ubmVjdGlvbk9wdGlvbnMub3B0aW9ucyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
