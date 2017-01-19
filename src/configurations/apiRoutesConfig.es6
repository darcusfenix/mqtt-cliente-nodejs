import mqttRouter from "../routes/mqtt.es6";
import cors from "cors";

export default function apiRoutesConfig(app) {

    app.use(cors());
    app.use(mqttRouter);

}
