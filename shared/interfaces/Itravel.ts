interface IgetAllTravels {
    fields: string[],
    size: number,
    page: number,
    order?: string,
    filter?: {
        departureStationNameContains?: string,
        returnStationNameContains?: string,
        distanceMore?: number,
        durationMore?: number,
        departureTimeMore?: number,
        departureTimeLess?: number
    }
}
export { IgetAllTravels }