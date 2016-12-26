import should from "should";
import request from "supertest";
import app from "../server.es6";
import mongoose from "mongoose";

const Pet = mongoose.model("pet"),
    agent = request.agent(app);


describe("Pet Crud Test", () => {

    it("Should allow a pet to be posted and return a read and _id", (done) => {

        const petPost = {"name": "new Pet", "age": 10, "genere": "h"};

        agent.post("/api/pet")
            .send(petPost)
            .expect(200)
            .end((err, results) => {

                results.body.lost.should.not.equal(false);
                results.body.should.have.property("_id");
                done();


            });

    });

    afterEach((done) => {

        Pet.remove().exec();
        done();

    });

});
