import { User } from "../model/user"
import { checkReqForPasswordRecovery, checkReqForPasswordRecoveryRequest, checkReqForUserConfirmationData, checkReqForUserCreatingData, checkReqForUserLoginData } from "../../shared/typeGuards/user"
import md5 from "md5"
import jwt = require('jsonwebtoken')
import appSettingsFromFile from "../../shared/config/appSettings.json";
import { authVerifiedSendEmail, returnPasswordSendEmail } from "../middleware/nodeMailerFacade";

async function loginAsUser(req: Request, res: any) {
    if ((typeof req.body === "object") &&
        (checkReqForUserLoginData(req.body))) {
        User.findOne({
            where: {
                email: req.body.email.toLowerCase(),
                password: md5(req.body.password + appSettingsFromFile.password_soul),
                verified: true
            }
        })
            .then((record) => {
                if (record) {
                    const token = jwt.sign({
                        userId: record.dataValues.id,
                    }, appSettingsFromFile.jwt_secret, {
                        expiresIn: "24h"
                        //expiresIn: "10s"
                    })
                    res.status(200).json({
                        status:"Success",
                        message: `Bearer ${token}`
                    })
                }
                else {
                    res.status(409).json({
                        status: "Error",
                        message: "Account with such data was not found",
                    })
                }
            })
            .catch((e: Error) => {
                res.status(409).json({
                    status: "Error",
                    message: "Database write error",
                    error: e
                })
            })
    }
    else {
        res.status(409).json({
            status: "Error",
            message: "Bad request",
        })
    }
}

async function confirmationRegistration(req: Request, res: any) {
    if ((typeof req.body === "object") &&
        (checkReqForUserConfirmationData(req.body))) {
        User.update(
            {
                verified: true
            },
            {
                where:
                {
                    email: req.body.email,
                    verifiedСonfirmation: req.body.verifiedСonfirmation
                }
            }
        )
            .then((value) => {
                if (value[0]) {
                    console.log(value)
                    res.status(200).json({
                        status: "Success",
                        message: "The entry was successfully confirmed"
                    })
                }
                else {
                    res.status(409).json({
                        status: "Error",
                        message: "Given for confirmation are not correct",
                    })
                }
            })
            .catch((e: Error) => {
                res.status(409).json({
                    status: "Error",
                    message: "Database write error",
                    error: e
                })
            })
    }
    else {
        res.status(409).json({
            status: "Error",
            message: "Bad request",
        })
    }
}

async function registrationAsUser(req: Request, res: any) {
    if (("body" in req) &&
        (req.body) &&
        (typeof req.body === "object") &&
        (checkReqForUserCreatingData(req.body))) {
            if (req.body.adminKey!==appSettingsFromFile.adminKey){
                res.status(409).json({
                    status: "Error",
                    message: "Error admin key"
                })
                return
            }
        const userFind = await User.findOne({
            where: { email: req.body.email }
        })
        if (userFind) {
            res.status(409).json({
                status: "Error",
                message: "Email already used"
            })
        }
        else {
            const user = User.build({
                email: req.body.email.toLowerCase(),
                password: md5(req.body.password + appSettingsFromFile.password_soul),
                verifiedСonfirmation: md5(req.body.email.toLowerCase() + req.body.password + req.body.email.toLowerCase()+Date.now().toString)
            })
            user.save()
                .then(() => {                    
                    authVerifiedSendEmail(user.dataValues.email,user.dataValues.verifiedСonfirmation)
                    res.status(200).json({
                        status: "Success",
                        message: "User successfully created"
                    })
                })
                .catch((e) => {
                    res.status(409).json({
                        status: "Error",
                        message: "Database write error",
                        error: e
                    })
                })
        }

    }
    else {
        res.status(409).json({
            status: "Error",
            message: "Bad request",
        })
    }
}

async function passwordRecovery(req: Request, res: any) {
    if ((typeof req.body === "object") &&
        (checkReqForPasswordRecovery(req.body))) {
        User.update(
            {
                password: md5(req.body.password + appSettingsFromFile.password_soul),
                verifiedСonfirmation: md5(req.body.email.toLowerCase() + req.body.password + req.body.email.toLowerCase()+Date.now().toString)
            },
            {
                where:
                {
                    email:req.body.email,
                    verified: true,
                    verifiedСonfirmation:req.body.verifiedСonfirmation
                }
            }
        )
            .then((value) => {
                if (value[0]) {                                        
                    res.status(200).json({
                        status: "Success",
                        message: "The entry was successfully confirmed"
                    })
                }
                else {
                    res.status(409).json({
                        status: "Error",
                        message: "Given for confirmation are not correct",
                    })
                }
            })
            .catch((e: Error) => {
                res.status(409).json({
                    status: "Error",
                    message: "Database write error",
                    error: e
                })
            })
    }
    else {
        res.status(409).json({
            status: "Error",
            message: "Bad request",
        })
    }
}
async function passwordRecoveryRequest(req: Request, res: any) {
    if (("body" in req) &&
        (req.body) &&
        (typeof req.body === "object") &&
        (checkReqForPasswordRecoveryRequest(req.body))) {
        const userFind = await User.findOne({
            where: { email: req.body.email }
        })
        if (userFind) {
            returnPasswordSendEmail(userFind.dataValues.email,userFind.dataValues.verifiedСonfirmation)
            res.status(200).json({
                status: "Success",
                message: "Password recovery instructions have been sent to your email"
            })
        }
        else {res.status(409).json({
            status: "Error",
            message: "User with this email not found"
        })
        }

    }
    else {
        res.status(409).json({
            status: "Error",
            message: "Bad request",
        })
    }
}


export { loginAsUser, registrationAsUser, confirmationRegistration, passwordRecovery, passwordRecoveryRequest }

