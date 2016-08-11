var gulp = require("gulp");
var mocha = require("gulp-mocha");
var config = require("./config");

gulp.task("test:js", function() {
    return gulp.src(config.paths.tests.all, {read: false})
        .pipe(mocha({reporter: "nyan"}))
        .once("end", function() {
            process.exit();
        });
});
