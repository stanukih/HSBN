import express from 'express'
import { confirmationRegistration, loginAsUser, passwordRecovery, passwordRecoveryRequest, registrationAsUser } from '../controllers/auth' 
const authRouter = express.Router()

authRouter.post('/login', loginAsUser)
authRouter.post('/registration', registrationAsUser)
authRouter.post('/confirmationRegistration', confirmationRegistration)
authRouter.post('/passwordRecovery', passwordRecovery)
authRouter.post('/passwordRecoveryRequest', passwordRecoveryRequest)

export {authRouter}