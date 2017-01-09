import mongoose from "mongoose";
import bcrypt from "bcrypt";

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


UserSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {

        return next();

    }

    try {

        //const hash = await bcrypt.hashAsync(this.password, 12);
        bcrypt.hash(this.password, 16.5, (err, hash) => {

            if (err) {

                next(err);
                return;

            }

            this.password = hash;
            next();

        });


    } catch (err) {

        next(err);

    }

});


UserSchema.methods.passwordIsValid = function (password, callback) {

    bcrypt.compare(password, this.password, function (err, results){

        if (err){

            callback(false);

        }

        callback(null, results);

    });

};


export default UserSchema;
