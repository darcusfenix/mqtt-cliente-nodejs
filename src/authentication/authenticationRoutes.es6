import {Router} from "express";
import cors from "cors";
import log4js from "log4js";
import {getUserModel} from "../data_access/modelFactory.es6";


const authenticationRouter = Router();
const log = log4js.getLogger("ROUTE-AUTHENTICATION");
const prefijo = "/api/user/";

authenticationRouter.route(prefijo)
    .post(cors(), async(req, res) => {
        try {
            log.debug(`Atendiendo petición POST`);
            const User = await getUserModel();

            const {email, password, firstName, lastName} = req.body;

            log.debug(`Obteniendo valores: ${email} ${lastName}`);
            const existingUser = await User.findOne({username: email}).exec();

            if (existingUser) {

                return res.status(409).send(`The specified email ${email} address already exists.`);

            }

            const submittedUser = {
                firstName: firstName,
                lastName: lastName,
                username: email,
                email: email,
                password: password,
                created: Date.now()
            };

            log.debug("Creating New User");
            const user = new User(submittedUser);

            await user.save()
                .then((user) => {

                    if (user) {

                        log.debug(`Created User ${JSON.stringify(user)}`);

                    }

                })
                .catch((err) => {

                    if (err) {

                        log.debug(`Error occurred saving User ${err}`);

                    }

                });

            res.status(201).json({user: {firstName: user.firstName, lastName: user.lastName, email: user.email}});

        } catch (err) {

            throw err;

        }
    });


authenticationRouter.route(`${prefijo}login`)
    .post(cors(), async function (req, res) {
        try {
            const User = await getUserModel();
            const {email, password} = req.body;

            const existingUser = await User.findOne({username: email}).exec();

            if (!existingUser) {

                return res.status(401).send("Invalid username or password");

            }

            existingUser.passwordIsValid(password, function (err, results) {

                if (err) {

                    return res.status(401).send("There is a problem loggin in at the moment");

                } else if (!results) {

                    return res.status(401).send("Invalid username or password");

                }

                const userInfo = {
                    _id: existingUser._id,
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
                    username: existingUser.email
                };

                res.status(200).json({
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
                    username: existingUser.email
                });

            });

        }
        catch (err) {

            res.status(500).send("There was an error attempting to login. Please try again later.");
        }
    });


export default authenticationRouter;