import express, {Router} from "express";
import webpack from "webpack";
import {initialize} from "./initializationTasks";
import mongoose from "mongoose";
import cors from "cors";
import log4js from "log4js";
import bodyParser from "body-parser";
import webpackConfiguracion from "../webpack.config.dev";
import petRouter from "./routes/petRoute.es6";
import apiRouteConfig from "./configurations/apiRoutesConfig.es6";

const app = express(),
    compilar = webpack(webpackConfiguracion),
    port = 3000,
    log = log4js.getLogger("app");

app.use(log4js.connectLogger(log4js.getLogger("http"), {"level": "auto"}));

app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.json());


app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();

});

app.use(require("webpack-dev-middleware")(compilar, {
    "noInfo": true,
    "publicPath": webpackConfiguracion.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compilar));

/*
 if (process.env.NODE_ENV === "test") {

 mongoose.connect("mongodb://localhost:27017/pets");

 } else {

 mongoose.connect("mongodb://localhost:27017/test");

 }
 */

apiRouteConfig(app);

app.use("/api/pet", petRouter);


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

initialize()
    .then(function () {

        app.listen(port, function (err) {

            if (err) {

                log.error(err);

            } else {

                log.debug(`Express server listening at http://localhost:${port}`);


            }

        });

    })
    .catch(function (err) {

        log.error(err);

    });


module.exports = app;
