import {IuserCreating, IuserConfirmation, IuserLogin, IuserForRecovery, IuserEmail} from "../interfaces/Iuser"
function checkReqForUserCreatingData(data:unknown): data is IuserCreating {    
    if ((data) && (typeof data === "object")) {
        if (
            (Object.keys(data).length = 2) &&
            ("email" in data) && 
            ("password" in data)&&
            ("adminKey")) {
                return true
        }
        return false
    }
    else return false
}
function checkReqForPasswordRecovery(data:unknown): data is IuserForRecovery {    
    if ((data) && (typeof data === "object")) {
        if (
            (Object.keys(data).length = 1) &&
            ("email" in data)&&
            ("password" in data)&&
            ("verifiedСonfirmation" in data)) {
                return true
        }
        return false
    }
    else return false
}
function checkReqForPasswordRecoveryRequest(data:unknown): data is IuserEmail {    
    if ((data) && (typeof data === "object")) {
        if (
            (Object.keys(data).length = 1) &&
            ("email" in data)) {
                return true
        }
        return false
    }
    else return false
}
function checkReqForUserLoginData(data:unknown): data is IuserLogin {    
    if ((data) && (typeof data === "object")) {
        if (
            (Object.keys(data).length = 2) &&
            ("email" in data) && 
            ("password" in data)) {
                return true
        }
        return false
    }
    else return false
}
function checkReqForUserConfirmationData(data:unknown): data is IuserConfirmation {    
    if ((data) && (typeof data === "object")) {
        if (
            (Object.keys(data).length = 2) &&
            ("email" in data) && 
            ("verifiedСonfirmation" in data)) {
                return true
        }
        return false
    }
    else return false
}

export {checkReqForUserCreatingData,checkReqForUserConfirmationData, checkReqForUserLoginData, checkReqForPasswordRecovery, checkReqForPasswordRecoveryRequest}