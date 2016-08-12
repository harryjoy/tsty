var gulp = require("gulp");
var del = require("del");
var config = require("./config");

gulp.task("clean:dist", function() {
    return del([config.paths.dist.root]);
});

gulp.task("clean", ["clean:dist"]);
