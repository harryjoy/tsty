import { expect } from "chai";
import * as App from "../../index";
import ModuleNames from "../../lib/config/ModuleNames";

describe("Application: Modules", () => {
    const DEFAULT_MODULES = [ "database", "passport", "http", "app" ];

    it("should have no unresolved modules", () => {
        expect(App.application.modules.unresolved.empty()).to.be.true;
    });

    it("should have all default modules resolved", () => {
        expect(App.application.resolved).to.exist;
        expect(Object.keys(App.application.resolved)).to.be.an("array").and.to.be.not.empty
            .and.to.be.equal(DEFAULT_MODULES);
    });

    it("should have empty exportable modules", () => {
        expect(App.application.exportableModules).to.be.an("array").and.to.be.empty;
    });

    it("should thorw error for unavailable modules", () => {
        const funcWrapper = () => { new App.Module("users"); };
        expect(funcWrapper).to.throw("Not able to find module with name users."
            + " Please make sure its loaded.");
    });
});
