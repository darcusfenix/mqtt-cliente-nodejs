import express from "express";
import mongoose from "mongoose";
import Dog from "../../src-bk/models/dogModel.es6";

const routes = () => {

    const dogRouter = express.Router();

    dogRouter.route("/")
        .post((req, res) => {

            let dog = new Dog(req.body);
            dog.save();
            res.status(201).send(dog);

        })
        .get((req, res) => {

            let query = {};

            if (req.query.genere) {

                query.genere = req.query.genere;

            }

            Dog.find(query, (err, dogs) => {

                if (err) {

                    res.status(500).send(err);

                } else {

                    res.json(dogs);

                }

            });

        });

    dogRouter.use("/:id", (req, res, next) => {

        const query = Dog.findById({"_id": req.params.id});

        mongoose.Promise = global.Promise;
        query.exec().then(dog => {

            req.dog = dog;
            next();

        }).catch(error => {

            res.statusCode = 404;
            res.json({"message": error});


        });

    });

    dogRouter.route("/:id")
        .get((req, res) => {

            res.json(req.dog);

        })
        .put((req, res) => {

            req.dog.name = req.body.name;
            req.dog.age = req.body.age;
            req.dog.genere = req.body.genere;
            req.dog.lost = req.body.lost;
            const promise = req.dog.save();


            promise.then(dog => {

                res.json(dog);

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

                req.dog[property] = req.body[property];

            }

            const promise = req.dog.save();


            promise.then(dog => {

                res.json(dog);

            });

            promise.catch(error => {

                res.statusCode = 505;
                res.json({"message": error});

            });

        });

    return dogRouter;

};

export default routes();
