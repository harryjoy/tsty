"use strict";
var ExpressConfigManager = (function () {
    function ExpressConfigManager() {
    }
    ExpressConfigManager.getConfigs = function () {
        return this.configs;
    };
    ExpressConfigManager.addConfig = function (constuct) {
        this.configs.push(constuct);
    };
    ExpressConfigManager.configs = [];
    return ExpressConfigManager;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExpressConfigManager;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9zZXJ2ZXIvZXhwcmVzcy9FeHByZXNzQ29uZmlnTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7SUFBQTtJQVVBLENBQUM7SUFQVSwrQkFBVSxHQUFqQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFTSw4QkFBUyxHQUFoQixVQUFpQixRQUF3QjtRQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBUmMsNEJBQU8sR0FBMEIsRUFBRSxDQUFDO0lBU3ZELDJCQUFDO0FBQUQsQ0FWQSxBQVVDLElBQUE7QUFWRDtzQ0FVQyxDQUFBIiwiZmlsZSI6ImxpYi9zZXJ2ZXIvZXhwcmVzcy9FeHByZXNzQ29uZmlnTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElFeHByZXNzQ29uZmlnIH0gZnJvbSBcIi4vSUV4cHJlc3NDb25maWdcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwcmVzc0NvbmZpZ01hbmFnZXIge1xuICAgIHByaXZhdGUgc3RhdGljIGNvbmZpZ3M6IEFycmF5PElFeHByZXNzQ29uZmlnPiA9IFtdO1xuXG4gICAgc3RhdGljIGdldENvbmZpZ3MoKTogQXJyYXk8SUV4cHJlc3NDb25maWc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlncztcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkQ29uZmlnKGNvbnN0dWN0OiBJRXhwcmVzc0NvbmZpZykge1xuICAgICAgICB0aGlzLmNvbmZpZ3MucHVzaChjb25zdHVjdClcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
