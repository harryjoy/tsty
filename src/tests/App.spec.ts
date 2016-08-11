import * as Promise from "bluebird";
import * as sinon from "sinon";
import * as express from "express";
import { expect } from "chai";
import { Container } from "lazy-dependable";
import * as App from "../index";
import ModuleNames from "../lib/config/ModuleNames";

class DummyInitializer implements App.IAppInitializer {
    initialize(app?: typeof App.application): Promise<{}> {
        const defer = Promise.defer();
        defer.resolve(true);
        return defer.promise;
    }
}

class DummyConfigBuilder implements App.IConfigBuilder {
    configure(config: App.Configuration) {
        var defer = Promise.defer();
        config["me"] = "harsh raval";
        config.putExtra("ok", "awesome");
        defer.resolve();
        return defer.promise;
    }
}

describe("Application", () => {
    const packageData = require("../../package.json");
    const dummyInit = new DummyInitializer();
    const dummyConfigBuilder = new DummyConfigBuilder();
    let initSpy: Sinon.SinonSpy, configSpy: Sinon.SinonSpy;

    before(() => {
        initSpy = sinon.spy(dummyInit, "initialize");
        configSpy = sinon.spy(dummyConfigBuilder, "configure");
        App.initializer.addInitializer(dummyInit);
        App.configBuilder.addConfigBuilder(dummyConfigBuilder);
    });

    it("shoud be initialized", () => {
        expect(App).to.exist;
        expect(App.application).to.exist;
        expect(App.application).to.be.an("object");
    });

    it("shoud extend Container", () => {
        expect(App.application instanceof Container).to.be.true;
    });

    before((done) => {
        App.application.serve({}, () => {
            done();
        });
    });

    describe("Configuration", () => {
        it("shoud be initialized", () => {
            expect(App.application.config).to.exist;
        });

        it("shoud match package version and name", () => {
            expect(App.application.name).to.exist;
            expect(App.application.version).to.exist;
            expect(App.application.name).to.be.eql(packageData.name);
            expect(App.application.version).to.be.eql(packageData.version);
        });

        it("should be in active status", () => {
            expect(App.application.active).to.be.true;
        });

        it("should return proper running status", () => {
            expect(App.application.active).to.be.true;
            expect(App.application.status).to.be.eql({
                active: true,
                name: packageData.name,
                version: packageData.version
            });
        });

        describe("Builder", () => {
            it("should call configure of all config builders", () => {
                expect(configSpy.calledOnce).to.be.true;
            });

            it("should have custom config properties added by config builder", () => {
                const config = App.application.config;
                expect(config["me"]).to.exist.and.to.eql("harsh raval");
                expect(config.getExtra("ok")).to.exist.and.to.eql("awesome");
            });
        });
    });

    describe("Initializers", () => {
        it("should call initialize of all initializers", () => {
            expect(initSpy.calledOnce).to.be.true;
        });
    });

    describe("Modules", () => {
        it("should have no unresolved modules", () => {
            expect(App.application.modules.unresolved.empty()).to.be.true;
        });

        it("should have all default modules resolved", () => {
            expect(App.application.resolved).to.exist;
            expect(Object.keys(App.application.resolved)).to.be.an("array").and.to.be.not.empty
                .and.to.be.equal([ "database", "passport", "http", "app" ]);
        });

        it("should be able to resolve app module", (done) => {
            App.application.resolve(ModuleNames.EXPRESS_APP_MODULE, (app) => {
                expect(app).to.exist;
                expect(app.get).to.exist;
                expect(app.post).to.exist;
                expect(app.put).to.exist;
                expect(app.delete).to.exist;
                done();
            });
        });

        it("should be able to resolve database module", (done) => {
            App.application.resolve(ModuleNames.DATABASE_MODULE, (database) => {
                expect(database).to.exist;
                expect(database.isConnected()).to.be.true;
                expect(database.registerModel).to.exist;
                expect(database.isModelExistInModels("dummy")).to.be.false;
                done();
            });
        });

        it("should have empty exportable modules", () => {
            expect(App.application.exportableModules).to.be.an("array").and.to.be.empty;
        });

        it("should thorw error for unavailable modules", () => {
            const funcWrapper = () => { new App.Module("users"); };
            expect(funcWrapper).to.throw("Not able to find module with name users. Please make sure its loaded.");
        });
    });
});
