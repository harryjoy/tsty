var gulp = require("gulp");
var tslint = require("gulp-tslint");
var config = require("./config");

gulp.task("lint:ts", function() {
    return gulp.src(config.paths.src.root)
        .pipe(tslint({
            configuration: {
                rules: config.linting.rules.ts
            },
            formatter: "prose"
        }))
        .pipe(tslint.report({
            emitError: false
        }));
});

gulp.task("lint", ["lint:ts"]);
