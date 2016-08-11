import { expect } from "chai";
import Events from "../../components/events/Events";
import * as sinon from "sinon";

describe("Events", () => {
    let evt: Events, listener;

    before(() => {
        evt = new Events("one");
    });

    beforeEach(function() {
        listener = sinon.stub();
        listener.reset();
    });

    it("shoud be initialized", () => {
        expect(evt).to.exist;
        expect(evt.name).to.exist.and.to.be.eql("one");
        expect(evt.on).to.exist;
    });

    it("should use name", () => {
        evt.on([evt.name, "test"], listener);
        evt.emit("test");
        expect(listener.calledOnce).to.be.true;
    });

    it("should work with arrays", () => {
        evt.on([evt.name, "test", "array"], listener);
        evt.emit(["test", "array"]);
        expect(listener.calledOnce).to.be.true;
    });

    it("should work with dot notation for array", () => {
        evt.on(evt.name + ".test" + ".array", listener);
        evt.emit(["test", "array"]);
        expect(listener.calledOnce).to.be.true;
    });

    describe("Default Data", function () {
        const def = { test: true };
        it("should send default data", function () {
            evt.setDefaults(def);
            evt.on("one.default", listener);
            evt.emit("default");
            expect(listener.calledOnce).to.be.true;
            expect(listener.calledWith(def)).to.be.true;
        });

        it("should append default data to end of array", function(){
            const obj = {};
            evt.setDefaults(def);
            evt.on("one.default.append", listener);
            evt.emit("default.append", obj);
            expect(listener.calledOnce).to.be.true;
            expect(listener.calledWith(obj, def)).to.be.true;
        });
    });
});
