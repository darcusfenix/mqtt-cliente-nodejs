const petController = (Pet) => {

    const get = (req, res) => {

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

        },
        post = (req, res) => {

            let pet = new Pet(req.body);


            if (!req.body.title) {

                res.status(400);
                res.send("Title is required");

            } else {

                pet.save();
                res.status(201);
                res.send(pet);

            }


        };

    return {
        "get": get,
        "post": post
    };

};

export default petController;
