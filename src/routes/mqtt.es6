import express from "express";
import log4js from "log4js";
import mqtt from "mqtt";

const log = log4js.getLogger("MQTT-ROUTER");
const uri = "tcp://activemq3870.cloudapp.net";
const topico = "cemex/prospectos";

let cliente;
const routes = () => {

    const mqttRouter = express.Router();
   
    mqttRouter.route("/mqtt")
        .post((req, res) => {

            log.debug(req.body)
            cliente = mqtt.connect(uri);
            cliente.on("connect",  function ()  {
                
                log.debug("Conectado");
                cliente.publish(topico, JSON.stringify(req.body));
                res.status(200).json({"mensaje": JSON.stringify(req.body)});

            });

        });
    return mqttRouter;

};

export default routes();
