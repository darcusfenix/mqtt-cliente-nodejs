
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
            pet.save();
            res.status(201).send(pet);

        };

    return {
        "get": get,
        "post": post
    };

};

export default petController;
