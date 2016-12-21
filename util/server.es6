import express from "express";
import path from "path";
import webpack from "webpack";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import compression from"compression" ;
import colors from "colors";
import webpackConfiguracion from "../webpack.config.dev";
import dogRouter from "../src/routes/dogRoute";

const app = express(),
    compilar = webpack(webpackConfiguracion),
    directorio = "src",
    port = 3000;

app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/dogs");


app.use("/api/dog", dogRouter);

app.use(require("webpack-dev-middleware")(compilar, {
    "noInfo": true,
    "publicPath": webpackConfiguracion.output.publicPath
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


    }

});

