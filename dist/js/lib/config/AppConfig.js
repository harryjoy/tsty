"use strict";
var _ = require("lodash");
var AppConfig = (function () {
    function AppConfig() {
        var configJson = require("../config.json");
        _.merge(this, configJson);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb25maWcvQXBwQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUk1QjtJQUlJO1FBQ0ksSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFMUIsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNiLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTtZQUN0QixPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU87U0FDL0IsQ0FBQztRQUVGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELDRCQUFRLEdBQVIsVUFBUyxHQUFXLEVBQUUsS0FBVSxFQUFFLFFBQWtCO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCw0QkFBUSxHQUFSLFVBQVMsR0FBVztRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDTCxnQkFBQztBQUFELENBNUJBLEFBNEJDLElBQUE7QUE1QkQ7MkJBNEJDLENBQUEiLCJmaWxlIjoibGliL2NvbmZpZy9BcHBDb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCAqIGFzIFR5cGVzIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL3R5cGVzL1R5cGVzXCI7XG5pbXBvcnQgeyBJRnJhbWV3b3JrLCBJQ29uZmlnIH0gZnJvbSBcIi4vSUNvbmZpZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBDb25maWcgaW1wbGVtZW50cyBJQ29uZmlnIHtcbiAgICBmcmFtZXdvcms6IElGcmFtZXdvcms7XG4gICAgYWRkaXRpb25hbENvbmZpZ3M6IFR5cGVzLk1hcDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBjb25zdCBjb25maWdKc29uID0gcmVxdWlyZShcIi4uL2NvbmZpZy5qc29uXCIpO1xuICAgICAgICBfLm1lcmdlKHRoaXMsIGNvbmZpZ0pzb24pO1xuXG4gICAgICAgIGNvbnN0IHBhY2thZ2VKc29uID0gcmVxdWlyZShcIi4uLy4uLy4uL3BhY2thZ2UuanNvblwiKTtcbiAgICAgICAgdGhpcy5mcmFtZXdvcmsgPSB7XG4gICAgICAgICAgICBuYW1lOiBwYWNrYWdlSnNvbi5uYW1lLFxuICAgICAgICAgICAgdmVyc2lvbjogcGFja2FnZUpzb24udmVyc2lvblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkaXRpb25hbENvbmZpZ3MgPSB7fTtcbiAgICB9XG5cbiAgICBwdXRFeHRyYShrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgb3ZlcnJpZGU/OiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmFkZGl0aW9uYWxDb25maWdzW2tleV0gJiYgIW92ZXJyaWRlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRpdGlvbmFsQ29uZmlnc1trZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGdldEV4dHJhKGtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkaXRpb25hbENvbmZpZ3Nba2V5XTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
