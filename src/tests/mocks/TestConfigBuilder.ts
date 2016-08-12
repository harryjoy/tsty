import * as App from "../../index";

export default class TestConfigBuilder implements App.IConfigBuilder {
    configure(config: App.Configuration) {
        var defer = Promise.defer();
        config.db = "test";
        config["me"] = "harsh raval";
        config.putExtra("ok", "awesome");
        defer.resolve();
        return defer.promise;
    }
}
