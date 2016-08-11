"use strict";
function validate(path, message) {
    return function (clazz, method, descriptor) {
        clazz["$$validators"] = clazz["$$validators"] || [];
        clazz["$$validators"].push({
            path: path,
            method: clazz[method],
            message: message
        });
    };
}
exports.validate = validate;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0YWJhc2UvbW9uZ28vZGVjb3JhdG9ycy92YWxpZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsa0JBQTBCLElBQVksRUFBRSxPQUFnQjtJQUNwRCxNQUFNLENBQUMsVUFBQyxLQUFLLEVBQUUsTUFBYyxFQUFFLFVBQThCO1FBQ3pELEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BELEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDdkIsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNyQixPQUFPLEVBQUUsT0FBTztTQUNuQixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUE7QUFDTCxDQUFDO0FBVGUsZ0JBQVEsV0FTdkIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2RhdGFiYXNlL21vbmdvL2RlY29yYXRvcnMvdmFsaWRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gdmFsaWRhdGUgKHBhdGg6IHN0cmluZywgbWVzc2FnZT86IHN0cmluZykge1xuICAgIHJldHVybiAoY2xhenosIG1ldGhvZDogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpID0+IHtcbiAgICAgICAgY2xhenpbXCIkJHZhbGlkYXRvcnNcIl0gPSBjbGF6eltcIiQkdmFsaWRhdG9yc1wiXSB8fCBbXTtcbiAgICAgICAgY2xhenpbXCIkJHZhbGlkYXRvcnNcIl0ucHVzaCh7XG4gICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgbWV0aG9kOiBjbGF6elttZXRob2RdLFxuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
