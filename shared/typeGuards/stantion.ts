import { IgetAllStantions, Istantion } from "../interfaces/Istantion"

function checkReqForStantionGet(data: unknown): data is Istantion {
    if ((data) && (typeof data === "object")) {
        if (
            (Object.keys(data).length = 1) &&
            ("stantion" in data)) {
            return true
        }
        return false
    }
    else return false
}

function checkReqForGetAllStantions(data: unknown): data is IgetAllStantions {
    console.log(data)
    if ((data) && (typeof data === "object")) {
        let keys = Object.keys(data)
        for (let key of keys) {
            if (!(['fields', 'size', 'page', 'sort', 'filter'].includes(key))) { return false }
            if ((key === "filter") &&
                ("filter" in data) &&
                (data.filter) &&
                (typeof data.filter === 'object')) {
                for (let key of Object.keys(data.filter)) {
                    if (!(['nameContains', 'adressContains',
                        'operaattorContains', 'kapasiteetMore'].includes(key))) {
                            console.log(1)
                        return false
                    }
                }
            }
        }
        for (let key of ['fields', 'size', 'page']) {
            if (!(keys.includes(key))) {
                {
                    return false
                }
            }
        }
        let dataPreparation=data as IgetAllStantions
        if ((!(isNaN(dataPreparation.size)))&&
        (!(isNaN(dataPreparation.page)))&&
        ((dataPreparation.filter?.kapasiteetMore)&&(isNaN(dataPreparation.filter?.kapasiteetMore)))){
            return false
            }    
        
        return true
    }
    else return false
}
export { checkReqForStantionGet, checkReqForGetAllStantions }