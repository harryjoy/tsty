var gulp = require("gulp");
var gulpSequence = require('gulp-sequence');

require("./build/linting");
require("./build/config");
require("./build/compile");
require("./build/copy");
require("./build/test");
require("./build/clean");

gulp.task("default", gulpSequence("clean", ["copy", "lint", "build"]));
gulp.task("test", gulpSequence("default", "test:js"));
