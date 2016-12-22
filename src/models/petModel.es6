import mongoose from "mongoose";

const Schema = mongoose.Schema,
    schemaPet = new Schema({

        "name": {
            "type": String
        },
        "age": {
            "type": Number
        },
        "genere": {
            "type": String
        },
        "lost": {
            "type": Boolean,
            "default": true
        }

    });

export default mongoose.model("pet", schemaPet);
