import express from "express";
import log4js from "log4js";
import mqtt from "mqtt";

const log = log4js.getLogger("MQTT-ROUTER");
const uri = "mqtt://activemq3870.cloudapp.net";
const topico = "cemex/prospectos";

let cliente;
const routes = () => {

    const mqttRouter = express.Router();
    cliente = mqtt.connect('mqtt://activemq3870.cloudapp.net');
    mqttRouter.route("/mqtt")
        .post((req, res) => {

            log.debug(req.body);



            cliente.on('connect',  () => {

                cliente.publish(topico, req.body);
                res.status(200).json({"mensaje": "Se envió tu payload! :)"});

            });



        });
    return mqttRouter;

};

export default routes();
