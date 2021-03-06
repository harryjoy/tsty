"use strict";
function virtual(path, action) {
    if (action === void 0) { action = "get"; }
    if ("string" !== typeof path) {
        throw new Error("A virtual must have a path");
    }
    return function (clazz, method, descriptor) {
        if (!clazz["$$virtuals"]) {
            clazz["$$virtuals"] = {
                get: [],
                set: []
            };
        }
        clazz["$$virtuals"][action].push({
            path: path,
            method: clazz[method]
        });
    };
}
exports.virtual = virtual;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0YWJhc2UvbW9uZ28vZGVjb3JhdG9ycy92aXJ0dWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFBeUIsSUFBSSxFQUFFLE1BQWM7SUFBZCxzQkFBYyxHQUFkLGNBQWM7SUFDekMsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBSyxDQUFDLENBQUMsQ0FBQztRQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUNELE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVTtRQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHO2dCQUNsQixHQUFHLEVBQUUsRUFBRTtnQkFDUCxHQUFHLEVBQUUsRUFBRTthQUNWLENBQUE7UUFDTCxDQUFDO1FBQ0QsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQztZQUM3QixJQUFJLEVBQUUsSUFBSTtZQUNWLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQ3hCLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQTtBQUNMLENBQUM7QUFoQmUsZUFBTyxVQWdCdEIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2RhdGFiYXNlL21vbmdvL2RlY29yYXRvcnMvdmlydHVhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiB2aXJ0dWFsIChwYXRoLCBhY3Rpb24gPSBcImdldFwiKSB7XG4gICAgaWYgKFwic3RyaW5nXCIgIT09IHR5cGVvZiBwYXRoICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIHZpcnR1YWwgbXVzdCBoYXZlIGEgcGF0aFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIChjbGF6eiwgbWV0aG9kLCBkZXNjcmlwdG9yKSA9PiB7XG4gICAgICAgIGlmICghY2xhenpbXCIkJHZpcnR1YWxzXCJdKSB7XG4gICAgICAgICAgICBjbGF6eltcIiQkdmlydHVhbHNcIl0gPSB7XG4gICAgICAgICAgICAgICAgZ2V0OiBbXSxcbiAgICAgICAgICAgICAgICBzZXQ6IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2xhenpbXCIkJHZpcnR1YWxzXCJdW2FjdGlvbl0ucHVzaCh7XG4gICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgbWV0aG9kOiBjbGF6elttZXRob2RdXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
