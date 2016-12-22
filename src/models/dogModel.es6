import mongoose from "mongoose";

const Schema = mongoose.Schema,
    schemaDog = new Schema({

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

export default mongoose.model("dog", schemaDog);
