import express from "express";
import webpack from "webpack";
import mongoose from "mongoose";
import log4js from "log4js";
import bodyParser from "body-parser";
import webpackConfiguracion from "../webpack.config.dev";
import petRouter from "./routes/petRoute.es6";

const app = express(),
    compilar = webpack(webpackConfiguracion),
    port = 3000,
    log = log4js.getLogger("app");

app.use(log4js.connectLogger(log4js.getLogger("http"), {"level": "auto"}));

app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/pets");



app.use("/api/pet", petRouter);

app.use(require("webpack-dev-middleware")(compilar, {
    "noInfo": true,
    "publicPath": webpackConfiguracion.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compilar));

app.get("*", (req, res, next) => {

    let err = new Error();
    err.status = 404;
    next(err);

});

app.use((err, req, res, next) => {

    if (err.status !== 404) {

        return next();

    }

    res.statusCode = 404;

    res.json({"message": "url not found"});

});
/*
app.listen(port, (err) => {

    if (err) {

        console.log(err.red);

    } else {

        let message = `Server started on port:  ${port}`;
        log.info(message);

    }

});

*/

module.exports = app;
