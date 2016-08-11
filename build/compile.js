var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var config = require("./config");

var tsProject = ts.createProject("tsconfig.json", {
    "typescript": require("typescript")
});

gulp.task("build:source", function() {
    return gulp.src(config.paths.src.root)
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.paths.dist.output));
});

gulp.task("build", ["build:source"]);
