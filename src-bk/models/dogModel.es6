import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dogSchema = new Schema({
    "_id": {
        "type": String
    },
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

export default mongoose.model("dog", dogSchema);
