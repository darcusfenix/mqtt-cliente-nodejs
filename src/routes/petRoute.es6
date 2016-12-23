import express from "express";
import mongoose from "mongoose";
import log4js from "log4js";
import Pet from "../models/petModel.es6";
import petController from "../controllers/petController.es6";

const log = log4js.getLogger("ROUTE-PET"),
    routes = () => {

        const petRouter = express.Router();

        let controlador = petController(Pet);

        petRouter.route("/")
            .post(controlador.post)
            .get(controlador.get);

        petRouter.use("/:id", (req, res, next) => {

            const query = Pet.findById({"_id": req.params.id});

            mongoose.Promise = global.Promise;
            query.exec().then(pet => {

                req.pet = pet;
                log.debug("PET FOUND");
                log.debug(pet);
                next();

            }).catch(error => {

                log.error(error);
                res.statusCode = 404;
                res.json({"message": error});


            });

        });

        petRouter.route("/:id")
            .get((req, res) => {

                if (req.pet === null) {

                    res.statusCode = 404;
                    res.json({"message": "not found"});

                } else {

                    res.json(req.pet);

                }

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

            })
            .delete((req, res) => {

                const promise = req.pet.remove();


                promise.then(() => {

                    res.statusCode = 204;
                    res.json({"message": "removed"});

                });

                promise.catch(error => {

                    log.error(error);
                    res.statusCode = 505;
                    res.json({"message": error});

                });

            });

        return petRouter;

    };

export default routes();
