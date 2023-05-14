import { IDBMSsetingsServer} from "../interfaces/IbdSettings"
function isIDBMSsetingsServer(data:unknown):data is IDBMSsetingsServer{    
    if ((data)&&(typeof data==="object")&&("dialect" in data)) {
        if (("database" in data)&&(data.dialect === "postgres")) {
            return true
        }
        else {
            return false
        }
    }
    else {
        return false
    }
}
export {isIDBMSsetingsServer}
