import authenticationRouter from "../authentication/authenticationRoutes.es6";
import cors from "cors";

export default function apiRoutesConfig(app) {

    app.use(cors());
    app.use(authenticationRouter);

}
