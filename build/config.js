var _buildDate = new Date().getTime();
var tsLintRules = require("./tsLintRules.json");

module.exports = {
    buildDate: _buildDate,
    paths: {
        dist: {
            root: "./dist/",
            output: "./dist/js/"
        },
        src: {
            root: "./src/**/*.ts"
        },
        tests: {
            all: "./dist/js/tests/**/*.spec.js"
        },
        json: {
            all: ["package.json", "./src/*/*.json"],
            package: "package.json",
            config: "./src/*/config.json"
        }
    },
    linting: {
        rules: {
            ts: tsLintRules
        }
    }
};
