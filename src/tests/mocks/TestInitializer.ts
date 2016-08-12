import * as App from "../../index";

export default class TestInitializer implements App.IAppInitializer {
    initialize(app?: typeof App.application): Promise<{}> {
        const defer = Promise.defer();
        defer.resolve(true);
        return defer.promise;
    }
}
