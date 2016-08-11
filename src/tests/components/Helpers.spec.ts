import * as Helpers from "../../components/utils/Helpers";
import { expect } from "chai";

describe("Helpers", () => {
    let docArray1: Array<any>, docArray2: Array<any>;

    before(() => {
        docArray1 = [
            {id: 1, x: 1, y: 1},
            {id: 2, x: 1, y: 1},
            {id: 3, x: 1, y: 1},
            {id: 4, x: 1, y: 1},
            {id: 5, x: 1, y: 1},
            {id: 6, x: 1, y: 1},
            {id: 7, x: 1, y: 1}
        ];
        docArray2 = [
            {id: 1, x: 2, y: 1},
            {id: 2, x: 1, y: 1},
            {id: 4, x: 1, y: 2},
            {id: 6, x: 2, y: 1}
        ];
    });

    it("shoud map correct ids", () => {
        expect(Helpers.mapIds(docArray1, "id")).to.be.eql([1, 2, 3, 4, 5, 6, 7]);
        expect(Helpers.mapIds(docArray2, "id")).to.be.eql([1, 2, 4, 6]);
    });

    it("shoud lower case first letter of string", () => {
        expect(Helpers.lowerCaseFirstLetter("Lowercase")).to.be.eql("lowercase");
    });

    describe("diff object", () => {
        it("shoud be able to find correct difference between two array", () => {
            expect(Helpers.diffObj([], [], "x")).to.be.eql([]);
            expect(Helpers.diffObj(docArray1, [], "id")).to.be.eql(docArray1);
            expect(Helpers.diffObj([], docArray1, "y")).to.be.eql([]);
        });

        it("shoud be able to find correct difference between two document array", () => {
            expect(Helpers.diffDocs(docArray1, docArray2)).to.be.eql({
                updated: [docArray2[0], docArray2[2], docArray2[3]],
                deleted: [docArray1[2].id, docArray1[4].id, docArray1[6].id]
            });
        });
    });
});
