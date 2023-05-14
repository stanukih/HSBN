import { DataTypes, FindOptions, Op } from "sequelize"
import { returnCsvByLine } from 'csvparserts/parser/index'
import appSettingsFromFile from "../../shared/config/appSettings.json";
import { IAppSettings } from "../../shared/interfaces/appSettings"
import { Travel } from "../model/travels";
import { ErrorsCSV } from "../model/error";
import { Stantions } from "../model/stantions";
import { IreturnCsvData } from "csvparserts/parser/types";
import { checkReqForGetAllTravels } from "../../shared/typeGuards/travel";
import { checkReqForGetAllErrors } from "../../shared/typeGuards/error";
import { sequelizeConnect } from "../middleware/sequelizeConnect";

async function loadingFileFree(_req: any, res: any) {
    if (sequelizeConnect.loading) {
        res.status(400).json({
            status: "Error",
            message: "Wait for the previous file to be processed"
        })
    }
    else {
        res.status(200).json({
            status: "Success"
        })
    }
}

async function saveBaseTravelsPack(req: any, res: any) {
    if ((typeof req === 'object') &&
        ('file' in req) &&
        (typeof req.file === 'object') &&
        (req.file !== null) &&
        ('path' in req.file)) {
        res.status(200).json({
            status: "Success",
            message: "Load stantions"
        })
        const token = req.headers['authorization'] as string
        const dataFromToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        const filepath: string = req.file.filename
        const userRef = dataFromToken.userId as typeof DataTypes.UUID
        const appSettings = appSettingsFromFile as IAppSettings
        let toSave: Itravels[] = []
        let toSaveError: IerrorCSV[] = []
        const stationsAlreadyExist = (await Stantions.findAll({
            attributes: ["id"]
        })).map((station) => parseInt(station.dataValues.id))
        console.log("stationsAlreadyExist", stationsAlreadyExist)
        let dataFromCsv: IreturnCsvData
        try {
            dataFromCsv = returnCsvByLine({
                dataLoad: appSettings.media.path + "//" + filepath,
                header: true,
                validator: ['date', 'date', 'number', 'string',
                    'number', 'string', 'number', 'number'],
                optionParse: {
                    delimiter: ",",
                    quotes: "\""
                }
            })
        }
        catch {
            return
        }
        dataFromCsv.dataSuccess.forEach((data) => {
            if ((parseInt(data[7]) < 10) || (parseInt(data[6]) < 10)) {
                const dataError = data.join(",")
                toSaveError.push({
                    data: dataError,
                    table: "travel",
                    fileLoad: filepath,
                    userRef: userRef,
                    error: "Time or length less than 10"
                })
            }
            else if ((stationsAlreadyExist.includes(parseInt(data[2])) &&
                (stationsAlreadyExist.includes(parseInt(data[4]))))

            ) {

                toSave.push({
                    departure_time: new Date(data[0]),
                    return_time: new Date(data[1]),
                    departure_station_id: parseInt(data[2]),
                    departure_station_name: data[3],
                    return_station_id: parseInt(data[4]),
                    return_station_name: data[5],
                    distance: parseInt(data[6]),
                    duration: parseInt(data[7]),
                    fileLoad: filepath,
                    userRef: userRef
                })
            }

            else {
                const dataError = data.join(",")
                toSaveError.push({
                    data: dataError,
                    table: "travel",
                    fileLoad: filepath,
                    userRef: userRef,
                    error: "The station of departure or arrival is not in the table of stations"
                })
            }
        })
        sequelizeConnect.loading = true
        while (toSave.length > 0) {
            try {
                await Travel.bulkCreate(toSave.splice(0, 10000) as any)
            } catch {
                return
            }
        }
        dataFromCsv.dataError.forEach((data) => {
            const dataError = data.join(",")
            toSaveError.push({
                data: dataError,
                table: "travel",
                fileLoad: filepath,
                userRef: userRef,
                error: "Incorrect data"
            })
        })
        while (toSaveError.length > 0) {
            try {
                await ErrorsCSV.bulkCreate(toSaveError.splice(0, 100) as any)
            } catch {
                return
            }
        }
        sequelizeConnect.loading = false
    }
    else {
        res.status(409).json({
            status: "Error",
            message: "Bad request",
        })
    }
}

interface IerrorCSV {
    data: string,
    table: string,
    fileLoad: string,
    error: string,
    userRef: typeof DataTypes.UUID
}

interface Itravels {
    departure_time: Date,
    return_time: Date,
    departure_station_id: number,
    departure_station_name: string,
    return_station_id: number,
    return_station_name: string,
    distance: number,
    duration: number,
    fileLoad: string,
    userRef: typeof DataTypes.UUID
}


async function getAllTravels(req: any, res: any) {
    if ((typeof req === 'object') &&
        ('body' in req) &&
        (typeof req.body === 'object') &&
        (checkReqForGetAllTravels(req.body))) {
        let findOptions: FindOptions = {}
        let wherePreparatory = []
        if (req.body.fields) {
            findOptions.attributes = req.body.fields
        }
        if (req.body.size) {
            findOptions.limit = req.body.size
        }
        if ((req.body.page) && (req.body.size)) {
            findOptions.offset = req.body.page * req.body.size
        }
        if (req.body.sort) {
            findOptions.order = [[req.body.sort, "ASC"]]
        }
        if (req.body.filter) {
            if (req.body.filter.departureStationNameContains) {
                wherePreparatory.push({
                    departure_station_name: { [Op.like]: `%${req.body.filter.departureStationNameContains}%` }
                })
            }
            if (req.body.filter.returnStationNameContains) {
                wherePreparatory.push({
                    return_station_name: { [Op.like]: `%${req.body.filter.returnStationNameContains}%` }
                })
            }

            if (req.body.filter.distanceMore) {
                wherePreparatory.push({
                    distance: { [Op.gt]: req.body.filter.distanceMore }
                })
            }

            if (req.body.filter.durationMore) {
                wherePreparatory.push({
                    distance: { [Op.gt]: req.body.filter.durationMore }
                })
            }

            if (req.body.filter.departureTimeMore) {
                wherePreparatory.push({
                    departure_time: { [Op.gt]: req.body.filter.departureTimeMore }
                })
            }
            if (req.body.filter.departureTimeLess) {
                wherePreparatory.push({
                    departure_time: { [Op.lt]: req.body.filter.departureTimeLess }
                })
            }
        }
        if (wherePreparatory) {
            findOptions.where = {
                [Op.and]: wherePreparatory,
            };
        }
        try {
            const count = await Travel.count({
                where: {
                    [Op.and]: wherePreparatory,
                }
            })
            const stantions = await Travel.findAll(
                findOptions
            )
            res.status(200).json(
                {
                    status: "Success",
                    count,
                    stantions
                }
            )
        } catch {
            res.status(400).json(
                {
                    status: "Error",
                    message: "Error from load data from DB"
                }
            )
        }
    }
    else {
        res.status(409).json({
            status: "Error",
            message: "Bad request",
        })
    }
}

async function getAllError(req: any, res: any) {
    if ((typeof req === 'object') &&
        ('body' in req) &&
        (typeof req.body === 'object') &&
        (checkReqForGetAllErrors(req.body))) {
        try {
            const count = await ErrorsCSV.count()
            const errorsDB = await ErrorsCSV.findAll({
                order: ["createdAt"],
                offset: req.body.page * req.body.size,
                limit: req.body.size
            })
            res.status(200).json(
                {
                    status: "Success",
                    count,
                    errorsDB
                })
        } catch (error) {
            res.status(400).json(
                {
                    status: "Error",
                    message: "Error from load data from DB"
                }
            )
        }
    }
    else {
        res.status(409).json({
            status: "Error",
            message: "Bad request",
        })
    }
}


export { saveBaseTravelsPack, getAllTravels, loadingFileFree, getAllError }