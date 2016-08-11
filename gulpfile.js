var gulp = require("gulp");
var gulpSequence = require('gulp-sequence');

require("./build/linting");
require("./build/config");
require("./build/compile");
require("./build/copy");
require("./build/test");

gulp.task("default", ["copy", "lint", "build"]);
gulp.task("test", gulpSequence(["copy", "lint", "build"], "test:js"));
