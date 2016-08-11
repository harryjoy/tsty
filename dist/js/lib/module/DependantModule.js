"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var path = require("path");
var DependableList = require("dependable-list");
var ModuleConfig_1 = require("./ModuleConfig");
var DependantModule = (function (_super) {
    __extends(DependantModule, _super);
    function DependantModule(name, version, source, appFileName) {
        _super.call(this);
        this.name = name;
        this.version = version;
        this.source = source;
        this.appFileName = appFileName;
        if (!this.appFileName) {
            this.appFileName = ModuleConfig_1.default.DEFAULT_APP_FILE_NAME;
        }
    }
    Object.defineProperty(DependantModule.prototype, "path", {
        get: function () {
            return path.join(process.cwd(), this.source);
        },
        enumerable: true,
        configurable: true
    });
    DependantModule.prototype.clear = function () {
        this.name = null;
        this.version = null;
        this.source = null;
        this.appFileName = ModuleConfig_1.default.DEFAULT_APP_FILE_NAME;
    };
    DependantModule.prototype.destroy = function () {
        this.clear();
    };
    DependantModule.prototype.buildPathWith = function (additionalPath) {
        return path.join(this.path, additionalPath);
    };
    DependantModule.prototype.load = function () {
        var modulePath = this.buildPathWith(this.appFileName);
        var req = require(modulePath);
        if (req && "function" === req.init) {
            req.init(this);
        }
    };
    return DependantModule;
}(DependableList.dependableConstructor()));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DependantModule;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9tb2R1bGUvRGVwZW5kYW50TW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQVksSUFBSSxXQUFNLE1BQU0sQ0FBQyxDQUFBO0FBRzdCLElBQVksY0FBYyxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFDbEQsNkJBQXlCLGdCQUFnQixDQUFDLENBQUE7QUFHMUM7SUFBNkMsbUNBQXNDO0lBQy9FLHlCQUFtQixJQUFZLEVBQVMsT0FBZSxFQUFTLE1BQU0sRUFBUyxXQUFvQjtRQUMvRixpQkFBTyxDQUFDO1FBRE8sU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFBO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVM7UUFFL0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLHNCQUFZLENBQUMscUJBQXFCLENBQUM7UUFDMUQsQ0FBQztJQUNMLENBQUM7SUFFRCxzQkFBSSxpQ0FBSTthQUFSO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxDQUFDOzs7T0FBQTtJQUVELCtCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLHNCQUFZLENBQUMscUJBQXFCLENBQUM7SUFDMUQsQ0FBQztJQUVELGlDQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELHVDQUFhLEdBQWIsVUFBYyxjQUFzQjtRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCw4QkFBSSxHQUFKO1FBQ0ksSUFBSSxVQUFVLEdBQVcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUQsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxVQUFVLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixDQUFDO0lBQ0wsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FsQ0EsQUFrQ0MsQ0FsQzRDLGNBQWMsQ0FBQyxxQkFBcUIsRUFBRSxHQWtDbEY7QUFsQ0Q7aUNBa0NDLENBQUEiLCJmaWxlIjoibGliL21vZHVsZS9EZXBlbmRhbnRNb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcbmltcG9ydCAqIGFzIERlcGVuZGFibGVMaXN0IGZyb20gXCJkZXBlbmRhYmxlLWxpc3RcIjtcbmltcG9ydCBNb2R1bGVDb25maWcgZnJvbSBcIi4vTW9kdWxlQ29uZmlnXCI7XG5pbXBvcnQgTW9kdWxlTGlzdCBmcm9tIFwiLi9Nb2R1bGVMaXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlcGVuZGFudE1vZHVsZSBleHRlbmRzIERlcGVuZGFibGVMaXN0LmRlcGVuZGFibGVDb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgdmVyc2lvbjogc3RyaW5nLCBwdWJsaWMgc291cmNlLCBwdWJsaWMgYXBwRmlsZU5hbWU/OiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgaWYgKCF0aGlzLmFwcEZpbGVOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmFwcEZpbGVOYW1lID0gTW9kdWxlQ29uZmlnLkRFRkFVTFRfQVBQX0ZJTEVfTkFNRTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBwYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgdGhpcy5zb3VyY2UpO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBudWxsO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSBudWxsO1xuICAgICAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG4gICAgICAgIHRoaXMuYXBwRmlsZU5hbWUgPSBNb2R1bGVDb25maWcuREVGQVVMVF9BUFBfRklMRV9OQU1FO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBidWlsZFBhdGhXaXRoKGFkZGl0aW9uYWxQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKHRoaXMucGF0aCwgYWRkaXRpb25hbFBhdGgpO1xuICAgIH1cblxuICAgIGxvYWQoKSB7XG4gICAgICAgIGxldCBtb2R1bGVQYXRoOiBzdHJpbmcgPSB0aGlzLmJ1aWxkUGF0aFdpdGgodGhpcy5hcHBGaWxlTmFtZSk7XG4gICAgICAgIGxldCByZXEgPSByZXF1aXJlKG1vZHVsZVBhdGgpO1xuICAgICAgICBpZiAocmVxICYmIFwiZnVuY3Rpb25cIiA9PT0gcmVxLmluaXQpIHtcbiAgICAgICAgICAgIHJlcS5pbml0KHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
