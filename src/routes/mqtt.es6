import express from "express";
import log4js from "log4js";
import mqtt from "mqtt";

const log = log4js.getLogger("MQTT-ROUTER");
const uri = "mqtt://activemq3870.cloudapp.net";
let topico = "cemex/prospectos",
    mensaje;

let cliente;
const routes = () => {

    const mqttRouter = express.Router();
    cliente = mqtt.connect(uri);

    mqttRouter.route("/mqtt")
        .post((req, res) => {

            mensaje = req.body;

            log.debug(req.body);

            cliente.on("connect", () => {

                cliente.publish(topico, mensaje);
                res.status(200).json({"mensaje": "Se envió tu payload! :)"});

            });


        });

    mqttRouter.route("/api/v2/mqtt")
        .post((req, res) => {

            mensaje = req.body;

            log.debug(req.body);

            if (req.body.topico && typeof req.body.topico === "string") {

                topico = req.body.topico

            } else if (req.body.mensaje) {

                mensaje = req.body.mensaje;

            }

            cliente.on("connect", () => {

                cliente.publish(topico, mensaje);
                res.status(200).json({"mensaje": "Se envió tu payload! :)"});

            });

        });

    return mqttRouter;

};

export default routes();
