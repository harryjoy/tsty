import * as express from "express";
import * as request from "supertest";
import { expect } from "chai";
import * as App from "../../index";
import ModuleNames from "../../lib/config/ModuleNames";

describe("Application: Server", () => {
    const PACKAGE_DATA = require("../../../package.json");
    const DEFAULT_MODULES = [ "database", "passport", "http", "app" ];

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

    it("should return exportable modoules defined in application", (done) => {
        App.application.resolve(ModuleNames.EXPRESS_APP_MODULE, (app) => {
            request(app).get(App.application.config.url.modules)
                .expect(200)
                .end((err, res) => {
                    expect(err).to.not.exist;
                    expect(res.body).to.be.an("array").and.to.be.empty;
                    done();
                });
        });
    });

    it("should return all modoules defined in application", (done) => {
        App.application.resolve(ModuleNames.EXPRESS_APP_MODULE, (app) => {
            request(app).get(App.application.config.url.allModules)
                .expect(200)
                .end((err, res) => {
                    expect(err).to.not.exist;
                    expect(res.body).to.be.an("array").and.to.be.not.empty
                        .and.to.be.equal(DEFAULT_MODULES);
                    done();
                });
        });
    });

    it("should return correct framework information", (done) => {
        App.application.resolve(ModuleNames.EXPRESS_APP_MODULE, (app) => {
            request(app).get(App.application.config.url.framework)
                .expect(200)
                .end((err, res) => {
                    expect(err).to.not.exist;
                    expect(res.body).to.eql({
                        name: PACKAGE_DATA.name,
                        version: PACKAGE_DATA.version
                    });
                    done();
                });
        });
    });
});
