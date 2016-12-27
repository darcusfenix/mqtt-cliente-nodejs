import UserSchema        from "../user/userModel.es6";
import connectionProvider from "./connectionProvider.es6";
import {serverSettings} from "./settings.es6";

export const getUserModel = async() => {
    try {

        const conn = await connectionProvider(serverSettings.serverUrl, serverSettings.database);
        return conn.model("user", UserSchema);

    } catch (err) {


        log.error(err);
        throw err;

    }

};
