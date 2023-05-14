import { IgetAllError } from "../interfaces/Ierror"
function checkReqForGetAllErrors(data: unknown): data is IgetAllError {
    if ((data) && (typeof data === "object")) {
        if (
            (Object.keys(data).length = 2) &&
            ("size" in data)&&
            ("page")) {
                return true
        }
        return false
    }
    else return false
}
export{checkReqForGetAllErrors}