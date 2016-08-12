"use strict";
var _ = require("lodash");
var AppConfig = (function () {
    function AppConfig(configFilePath) {
        var configJson = require("../config.json");
        _.merge(this, configJson);
        if (configFilePath) {
            var customConfig = require(configFilePath);
            _.merge(this, customConfig);
        }
        var packageJson = require("../../../package.json");
        this.framework = {
            name: packageJson.name,
            version: packageJson.version
        };
        this.additionalConfigs = {};
    }
    AppConfig.prototype.putExtra = function (key, value, override) {
        if (this.additionalConfigs[key] && !override) {
            return false;
        }
        this.additionalConfigs[key] = value;
        return true;
    };
    AppConfig.prototype.getExtra = function (key) {
        return this.additionalConfigs[key];
    };
    return AppConfig;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppConfig;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb25maWcvQXBwQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUk1QjtJQUlJLG1CQUFZLGNBQXVCO1FBQy9CLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRCxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsU0FBUyxHQUFHO1lBQ2IsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO1lBQ3RCLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTztTQUMvQixDQUFDO1FBRUYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsNEJBQVEsR0FBUixVQUFTLEdBQVcsRUFBRSxLQUFVLEVBQUUsUUFBa0I7UUFDaEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELDRCQUFRLEdBQVIsVUFBUyxHQUFXO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FoQ0EsQUFnQ0MsSUFBQTtBQWhDRDsyQkFnQ0MsQ0FBQSIsImZpbGUiOiJsaWIvY29uZmlnL0FwcENvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0ICogYXMgVHlwZXMgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvdHlwZXMvVHlwZXNcIjtcbmltcG9ydCB7IElGcmFtZXdvcmssIElDb25maWcgfSBmcm9tIFwiLi9JQ29uZmlnXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcENvbmZpZyBpbXBsZW1lbnRzIElDb25maWcge1xuICAgIGZyYW1ld29yazogSUZyYW1ld29yaztcbiAgICBhZGRpdGlvbmFsQ29uZmlnczogVHlwZXMuTWFwO1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlnRmlsZVBhdGg/OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY29uZmlnSnNvbiA9IHJlcXVpcmUoXCIuLi9jb25maWcuanNvblwiKTtcbiAgICAgICAgXy5tZXJnZSh0aGlzLCBjb25maWdKc29uKTtcbiAgICAgICAgaWYgKGNvbmZpZ0ZpbGVQYXRoKSB7XG4gICAgICAgICAgICBjb25zdCBjdXN0b21Db25maWcgPSByZXF1aXJlKGNvbmZpZ0ZpbGVQYXRoKTtcbiAgICAgICAgICAgIF8ubWVyZ2UodGhpcywgY3VzdG9tQ29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhY2thZ2VKc29uID0gcmVxdWlyZShcIi4uLy4uLy4uL3BhY2thZ2UuanNvblwiKTtcbiAgICAgICAgdGhpcy5mcmFtZXdvcmsgPSB7XG4gICAgICAgICAgICBuYW1lOiBwYWNrYWdlSnNvbi5uYW1lLFxuICAgICAgICAgICAgdmVyc2lvbjogcGFja2FnZUpzb24udmVyc2lvblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkaXRpb25hbENvbmZpZ3MgPSB7fTtcbiAgICB9XG5cbiAgICBwdXRFeHRyYShrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgb3ZlcnJpZGU/OiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmFkZGl0aW9uYWxDb25maWdzW2tleV0gJiYgIW92ZXJyaWRlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRpdGlvbmFsQ29uZmlnc1trZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGdldEV4dHJhKGtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkaXRpb25hbENvbmZpZ3Nba2V5XTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
