import should from "should";
import sinon from "sinon";
import petController from "../controllers/petController.es6";


describe("Pet Controller Tests:", () => {

    describe("Post", () => {

        it("should not allow an empty title on post", () => {

            const Pet = function (Pet) {

                    this.save = () => {
                    };

                },
                req = {
                    "body": {
                        "author": "Jon"
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

            res.send.calledWith("Title is required").should.equal(true);

        });

    });

    describe("Post two twice", () => {

        it("should not allow an empty title on post", () => {

            const Pet = function (Pet) {

                    this.save = () => {
                    };

                },
                req = {
                    "body": {
                        "author": "Jon"
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

            res.send.calledWith("Title is required").should.equal(true);

        });

    });

});
