import should from "should";
import sinon from "sinon";
import petController from "../controllers/petController.es6";


describe("Pet Controller Tests:", () => {

    describe("Post", () => {

        it("should not allow an empty name on post", () => {

            const Pet = function (Pet) {

                    this.save = () => {
                    };

                },
                req = {
                    "body": {
                        "hola": "Jon"
                    },
                    "query": {
                        "genere": "m"
                    }
                },
                res = {
                    "status": sinon.spy(),
                    "send": sinon.spy()
                };

            const controller = petController(Pet);

            controller.post(req, res);

            res.status.calledWith(400).should.equal(
                true, "Bad Status " + res.status.args[0][0]);

            res.send.calledWith("Name is required").should.equal(true);

        });

    });

    describe("Post two twice", () => {

        it("should not allow an empty name on post", () => {

            const Pet = function (Pet) {

                    this.save = () => {
                    };

                },
                req = {
                    "body": {
                        "hola": "Jon"
                    },
                    "query": {
                        "genere": "m"
                    }
                },
                res = {
                    "status": sinon.spy(),
                    "send": sinon.spy()
                };

            const controller = petController(Pet);

            controller.post(req, res);

            res.status.calledWith(400).should.equal(
                true, "Bad Status " + res.status.args[0][0]);

            res.send.calledWith("Name is required").should.equal(true);

        });

    });

});
