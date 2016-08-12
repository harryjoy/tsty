import { expect } from "chai";
import * as App from "../../index";
import ModuleNames from "../../lib/config/ModuleNames";
import TestDB from "../mocks/TestDB";

describe("Application: Database", () => {
    it("should be able to resolve database module", (done) => {
        App.application.resolve(ModuleNames.DATABASE_MODULE, (database) => {
            expect(database).to.exist;
            expect(database.isConnected()).to.be.true;
            expect(database.registerModel).to.exist;
            done();
        });
    });

    it("should return false for missing models", (done) => {
        App.application.resolve(ModuleNames.DATABASE_MODULE, (database) => {
            expect(database).to.exist;
            expect(database.isModelExistInModels).to.exist;
            expect(database.isModelExistInModels("dummy")).to.be.false;
            done();
        });
    });
});
