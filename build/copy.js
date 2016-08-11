var gulp = require("gulp");
var config = require("./config");


gulp.task("copy:json:package", function() {
    return gulp.src(config.paths.json.package)
        .pipe(gulp.dest(config.paths.dist.root));
});

gulp.task("copy:json:config", function() {
    return gulp.src(config.paths.json.config)
        .pipe(gulp.dest(config.paths.dist.output));
});

gulp.task("copy:json", ["copy:json:package", "copy:json:config"]);

gulp.task("copy", ["copy:json"]);