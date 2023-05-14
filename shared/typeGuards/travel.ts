import { IgetAllTravels } from "../interfaces/Itravel"
function checkReqForGetAllTravels(data: unknown): data is IgetAllTravels {
    if ((data) && (typeof data === "object")) {
        let keys = Object.keys(data)
        for (let key of keys) {
            if (!(['fields', 'size', 'page', 'sort', 'filter'].includes(key))) { 
                return false }
            if ((key === "filter") &&
                ("filter" in data) &&
                (data.filter) &&
                (typeof data.filter === 'object')) {
                for (let key of Object.keys(data.filter)) {
                    if (!([
                        'departureStationNameContains', 'returnStationNameContains',
                        'distanceMore', 'durationMore',
                        'departureTimeMore', 'departureTimeLess'].includes(key))) { 
                            return false }
                }
            }
        }
        for (let key of ['fields', 'size', 'page']) {
            if (!(keys.includes(key))) {
                { console.log(3)
                    return false }
            }
        }
        let dataPreparation=data as IgetAllTravels
        if ((!(isNaN(dataPreparation.size)))&&
        (!(isNaN(dataPreparation.page)))&&
        ((dataPreparation.filter?.distanceMore)&&(isNaN(dataPreparation.filter?.distanceMore)))&&
        ((dataPreparation.filter?.durationMore)&&(isNaN(dataPreparation.filter?.durationMore)))&&
        ((dataPreparation.filter?.departureTimeMore)&&(isNaN(dataPreparation.filter?.departureTimeMore)))&&
        ((dataPreparation.filter?.departureTimeLess)&&(isNaN(dataPreparation.filter?.departureTimeLess)))){
            console.log(4)
            return false
            }  
        return true
    }
    else return false
}
export { checkReqForGetAllTravels }