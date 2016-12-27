import mongoose from "mongoose";

const Schema = mongoose.Schema,
    UserSchema = new Schema({

        "firstName": String,
        "lastName": String,
        "username": {
            "type": String,
            "index": {
                "unique": true
            }
        },
        "password": {
            "type": String,
            "required": true,
        },
        "email": {
            "type": String,
            "require": true,
        },
        "created": {
            "type": Date,
            "required": true,
            "default": new Date()
        }

    });

export default UserSchema;
