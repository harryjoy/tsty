"use strict";
var Promise = require("bluebird");
var AppInitializer = (function () {
    function AppInitializer() {
        this.initializers = [];
    }
    AppInitializer.prototype.addInitializer = function (handler) {
        this.initializers.push(handler);
    };
    AppInitializer.prototype.initialize = function (app) {
        var deferred = Promise.defer();
        var promises = this.initializers.map(function (h) { return h.initialize(app); });
        Promise.all(promises).then(function () {
            var result = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                result[_i - 0] = arguments[_i];
            }
            deferred.resolve(result[0]);
        }).catch(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return AppInitializer;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppInitializer;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaW50aWFsaXplci9BcHBsaWNhdGlvbkluaXRpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE9BQU8sV0FBTSxVQUFVLENBQUMsQ0FBQTtBQUtwQztJQUFBO1FBQ1ksaUJBQVksR0FBMkIsRUFBRSxDQUFDO0lBZ0J0RCxDQUFDO0lBZEcsdUNBQWMsR0FBZCxVQUFlLE9BQXdCO1FBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxtQ0FBVSxHQUFWLFVBQWMsR0FBZ0I7UUFDMUIsSUFBTSxRQUFRLEdBQW1CLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQUMsZ0JBQVM7aUJBQVQsV0FBUyxDQUFULHNCQUFTLENBQVQsSUFBUztnQkFBVCwrQkFBUzs7WUFDakMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHO1lBQ1QsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFDTCxxQkFBQztBQUFELENBakJBLEFBaUJDLElBQUE7QUFqQkQ7Z0NBaUJDLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9pbnRpYWxpemVyL0FwcGxpY2F0aW9uSW5pdGlhbGl6ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBQcm9taXNlIGZyb20gXCJibHVlYmlyZFwiO1xuaW1wb3J0ICogYXMgVHlwZXMgZnJvbSBcIi4uL3R5cGVzL1R5cGVzXCI7XG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSBcIi4uLy4uL2xpYi9hd3RzXCI7XG5pbXBvcnQgeyBJQXBwSW5pdGlhbGl6ZXIgfSBmcm9tIFwiLi9JQXBwSW5pdGlhbGl6ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwSW5pdGlhbGl6ZXIge1xuICAgIHByaXZhdGUgaW5pdGlhbGl6ZXJzOiBBcnJheTxJQXBwSW5pdGlhbGl6ZXI+ID0gW107XG5cbiAgICBhZGRJbml0aWFsaXplcihoYW5kbGVyOiBJQXBwSW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplcnMucHVzaChoYW5kbGVyKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplPFQ+KGFwcDogQXBwbGljYXRpb24pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zdCBkZWZlcnJlZDogVHlwZXMuUmVzb2x2ZXIgPSBQcm9taXNlLmRlZmVyKCk7XG4gICAgICAgIGxldCBwcm9taXNlcyA9IHRoaXMuaW5pdGlhbGl6ZXJzLm1hcCgoaCkgPT4geyByZXR1cm4gaC5pbml0aWFsaXplKGFwcCk7IH0pO1xuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoLi4ucmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdFswXSk7XG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
