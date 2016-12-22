import express from "express";
import mongoose from "mongoose";
import Pet from "../models/petModel.es6";

const routes = () => {

    const petRouter = express.Router();

    petRouter.route("/")
        .post((req, res) => {

            let pet = new Pet(req.body);
            pet.save();
            res.status(201).send(pet);

        })
        .get((req, res) => {

            let query = {};

            if (req.query.genere) {

                query.genere = req.query.genere;

            }

            Pet.find(query, (err, pets) => {

                if (err) {

                    res.status(500).send(err);

                } else {

                    res.json(pets);

                }

            });

        });

    petRouter.use("/:id", (req, res, next) => {

        const query = Pet.findById({"_id": req.params.id});

        mongoose.Promise = global.Promise;
        query.exec().then(pet => {

            req.pet = pet;
            next();

        }).catch(error => {

            res.statusCode = 404;
            res.json({"message": error});


        });

    });

    petRouter.route("/:id")
        .get((req, res) => {

            res.json(req.pet);

        })
        .put((req, res) => {

            req.pet.name = req.body.name;
            req.pet.age = req.body.age;
            req.pet.genere = req.body.genere;
            req.pet.lost = req.body.lost;
            const promise = req.pet.save();


            promise.then(pet => {

                res.json(pet);

            });

            promise.catch(error => {

                res.statusCode = 505;
                res.json({"message": error});

            });

        })
        .patch((req, res) => {

            if (req.body._id) {

                delete req.body._id;

            }

            for (const property in req.body) {

                req.pet[property] = req.body[property];

            }

            const promise = req.pet.save();


            promise.then(pet => {

                res.json(pet);

            });

            promise.catch(error => {

                res.statusCode = 505;
                res.json({"message": error});

            });

        });

    return petRouter;

};

export default routes();
