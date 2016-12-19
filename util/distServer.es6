import express from "express";
import path from "path";
import open from "open";
import compression from"compression" ;


const app = express(),
    directorio = "public",
    port = 3000;


app.use(compression());
app.use(express.static(`${directorio}`));

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "../" + directorio + "/home.htm"));

});

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
        console.log(message);
        open("http://localhost:" + port);

    }

});

