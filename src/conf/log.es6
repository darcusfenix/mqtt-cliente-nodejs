import log4js from "log4js";
import fs from "fs";
import moment from "moment";


const today = moment(Date.now()).format("YYYYDDMM");
let appenders = [];

appenders.push({"type": "console"});

let categories = ["rest-api"];

categories.map(category => {

    appenders.push({
        "type": "file",
        "filename": category + "-" + today + ".log",
        "category": category,
        "maxLogSize": 100024,
        "backups": 10000
    });

});


log4js.configure({
    "appenders": appenders,
    "replaceConsole": true
});

export default (logLevel, logMessage, catalog) => {

    const logger = log4js.getLogger(categories);

    switch (logLevel) {
        case "TRACE":
            logger.trace(logMessage);
            break;
        case "INFO":
            logger.info(logMessage);
            break;
        case "WARN":
            logger.warn(logMessage);
            break;
        case "ERROR":
            logger.error(logMessage);
            break;
        case "FATAL":
            logger.fatal(logMessage);
            break;
        default:
            logger.debug(logMessage);
            break;
    }

};

