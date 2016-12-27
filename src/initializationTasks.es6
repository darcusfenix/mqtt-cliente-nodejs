import log4js from "log4js";

const log = log4js.getLogger("INITIAL-TASKS");

export const initialize = async() => {

    try {

        await functionOne();
        return await functionSecond();

    } catch (err) {
        throw err;
    }

};

const functionOne = async() => {


    try {

        setTimeout(() => {

            log.debug("PROCESANDO PRIMERA FUNCIÓN");


        }, 1500);

    } catch (err) {

        throw err;

    }

};

const functionSecond = async() => {


    try {

        setTimeout(() => {

            log.debug("PROCESANDO SEGUNDA FUNCIÓN");


        }, 1500);

    } catch (err) {
        throw err;
    }
};

