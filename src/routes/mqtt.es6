import express from "express";
import log4js from "log4js";
import mqtt from "mqtt";

const log = log4js.getLogger("MQTT-ROUTER");
const uri = "tcp://activemq3870.cloudapp.net/mqtt";
let topico = "cemex/prospectos",
    mensaje;

let cliente;
const routes = () => {

    const mqttRouter = express.Router();

    mqttRouter.route("/mqtt")
        .post((req, res) => {
            mensaje = req.body;
            log.debug(mensaje);
            cliente = mqtt.connect(uri);

            cliente.on("connect", () => {

                log.debug("Conectado");

                cliente.publish(topico, JSON.stringify(mensaje));
                res.status(200).json(req.body);

            });

        });
    mqttRouter.route("/api/v2/mqtt")
        .post((req, res) => {

            mensaje = req.body;

            log.debug(req.body);
            if (req.body.topico && typeof req.body.topico === "string") {

                topico = req.body.topico;

            } else if (req.body.mensaje) {

                mensaje = req.body.mensaje;

            }

            cliente = mqtt.connect(uri);
            cliente.on("connect", () => {


                log.debug("Conectado");
                cliente.publish(topico, JSON.stringify(mensaje));
                res.status(200).json(req.body);

            });

        });
    return mqttRouter;

};

export default routes();
