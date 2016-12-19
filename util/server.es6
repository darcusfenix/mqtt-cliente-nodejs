import express from "express";
import path from "path";
import open from "open";
import webpack from "webpack";
import mongoose from "mongoose";
import compression from"compression" ;
import colors from "colors";
import webpackConfiguracion from "../webpack.config.dev";
import Dog from "../src-bk/models/dogModel";

const app = express(),
    compilar = webpack(webpackConfiguracion),
    directorio = "src",
    port = 3000;

let db = mongoose.connect("mongodb://localhost:27017/dogs");

let dogRouter = express.Router();

dogRouter.route("/dog")
    .get((req, res)=> {
        let query = {};

        if (req.query.genere) {

            query.genere = req.query.genere;

        }

        Dog.find(query, (err, dogs)=> {

            if (err) {

                res.status(500).send(err);

            } else {

                res.json(dogs);

            }

        });

    });

dogRouter.route("/dog/:id")
    .get((req, res)=> {

        Dog.findById(req.params.id, (err, dog)=> {

            if (err || dog === null) {

                res.statusCode = 404;
                res.json({"message": "not found"});

            } else {

                res.json(dog);

            }

        });

    });


app.use("/api", dogRouter);

app.use(require("webpack-dev-middleware")(compilar, {
    "noInfo": true,
    "publicPath": webpackConfiguracion.output.publicPath/**/
}));

app.use(require("webpack-hot-middleware")(compilar));

app.use(express.static(`${directorio}`));

/*
 app.get("/", (req, res) => {

 res.sendFile(path.join(__dirname, "../" + directorio + "/home.htm"));

 });
 */

app.get("*", (req, res, next) => {

    let err = new Error();
    err.status = 404;
    next(err);

});

app.use((err, req, res, next) => {

    if (err.status !== 404) {
        return next();
    }

    res.sendFile(path.join(__dirname, "../" + directorio + "/error.htm"));

});

app.listen(port, (err) => {

    if (err) {

        console.log(err);

    } else {

        let message = `SE INICIÓ EL SERVIDOR EN EL PUERTO:  ${port}`;
        console.log(message.green);
        open("http://localhost:" + port);

    }

});

