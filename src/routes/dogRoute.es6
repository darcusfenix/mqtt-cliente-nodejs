import express from "express";
import Dog from "../../src-bk/models/dogModel.es6";

const routes = () => {

    const dogRouter = express.Router();

    dogRouter.route("/dog")
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

    dogRouter.route("/dog/:id")
        .get((req, res) => {

            Dog.findById(req.params.id, (err, dog) => {

                if (err || dog === null) {

                    res.statusCode = 404;
                    res.json({"message": "not found"});

                } else {

                    res.json(dog);

                }

            });

        });

    return dogRouter;

};

export default routes();
