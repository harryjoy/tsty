import * as Promise from "bluebird";
import * as sinon from "sinon";
import * as express from "express";
import * as request from "supertest";
import { expect } from "chai";
import { Container } from "lazy-dependable";
import * as App from "../index";
import ModuleNames from "../lib/config/ModuleNames";
import TestInitializer from "./mocks/TestInitializer";
import TestConfigBuilder from "./mocks/TestConfigBuilder";
import TestDB from "./mocks/TestDB";

describe("Application", () => {
    const PACKAGE_DATA = require("../../package.json");
    const DEFAULT_MODULES = [ "database", "passport", "http", "app" ];
    const dummyInit = new TestInitializer();
    const dummyConfigBuilder = new TestConfigBuilder();
    let initSpy: Sinon.SinonSpy, configSpy: Sinon.SinonSpy;

    before(() => {
        initSpy = sinon.spy(dummyInit, "initialize");
        configSpy = sinon.spy(dummyConfigBuilder, "configure");
        App.initializer.addInitializer(dummyInit);
        App.DatabaseFactory.registerDbEngine("test", TestDB);
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
            expect(App.application.name).to.be.eql(PACKAGE_DATA.name);
            expect(App.application.version).to.be.eql(PACKAGE_DATA.version);
        });

        it("should be in active status", () => {
            expect(App.application.active).to.be.true;
        });

        it("should return proper running status", () => {
            expect(App.application.active).to.be.true;
            expect(App.application.status).to.be.eql({
                active: true,
                name: PACKAGE_DATA.name,
                version: PACKAGE_DATA.version
            });
        });

        describe("Builder", () => {
            it("should call configure of all config builders", () => {
                expect(configSpy.calledOnce).to.be.true;
            });

            it("should have custom config properties added by config builder", () => {
                const config = App.application.config;
                expect(config.db).to.exist.and.to.eql("test");
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
});
