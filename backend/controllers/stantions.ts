import { DataTypes, FindOptions, Op, Sequelize } from "sequelize"
import { returnCsvByLine } from 'csvparserts/parser/index'
import appSettingsFromFile from "../../shared/config/appSettings.json";
import { IAppSettings } from "../../shared/interfaces/appSettings"
import { Stantions } from "../model/stantions";
import { ErrorsCSV } from "../model/error";
import { checkReqForStantionGet, checkReqForGetAllStantions } from "../../shared/typeGuards/stantion";
import { Travel } from "../model/travels";
import { sequelizeConnect } from "../middleware/sequelizeConnect";

async function saveBaseStantionsPack(req: any, res: any) {    
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
        let toSave: Istantions[] = []
        let toSaveError: IerrorCSV[] = []
        const stationsAlreadyExist = (await Stantions.findAll({
            attributes: ["id"]
        })).map((station) => parseInt(station.dataValues.id))
        const dataFromCsv = returnCsvByLine({
            dataLoad: appSettings.media.path + "//" + filepath,
            header: true,
            validator: ['number', 'number', 'string', 'string',
                'string', 'string', 'string', 'string',
                'string', 'string', 'number', 'number',
                'number'],
            optionParse: {
                delimiter: ",",
                quotes: "\""
            }
        })
        dataFromCsv.dataSuccess.forEach((data) => {
            if (!stationsAlreadyExist.includes(parseInt(data[0])))
                toSave.push({
                    id: Number(data[0]),
                    fid: Number(data[1]),
                    nimi: data[2],
                    namn: data[3],
                    name: data[4],
                    osoite: data[5],
                    adress: data[6],
                    kaupunki: data[7],
                    stad: data[8],
                    operaattor: data[9],
                    kapasiteet: Number(data[10]),
                    positionX: Number(data[11]),
                    positionY: Number(data[12]),
                    fileLoad: filepath,
                    userRef: userRef
                })
            else {
                const dataError = data.join(",")
                toSaveError.push({
                    data: dataError,
                    table: "stantions",
                    fileLoad: filepath,
                    userRef: userRef,
                    error: "Duplicate ID"
                })
            }
        })
        sequelizeConnect.loading=true
        while (toSave.length > 0) {
            try {
                await Stantions.bulkCreate(toSave.splice(0, 1000) as any)
            } catch {
                return
            }
        }
        dataFromCsv.dataError.forEach((data) => {
            const dataError = data.join(",")
            toSaveError.push({
                data: dataError,
                table: "stantions",
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
        sequelizeConnect.loading=false
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
interface Istantions {
    fid: number,
    id: number,
    nimi: string,
    namn: string,
    name: string,
    osoite: string,
    adress: string,
    kaupunki: string,
    stad: string,
    operaattor: string,
    kapasiteet: number,
    positionX: number,
    positionY: number,
    fileLoad: string,
    userRef: typeof DataTypes.UUID
}

async function getStantionInfo(req: any, res: any) {
    if ((typeof req === 'object') &&
        ('body' in req) &&
        (typeof req.body === 'object') &&
        checkReqForStantionGet(req.body)) {
        try {
            Stantions.findByPk(parseInt(req.body.stantion))
                .then((data) => {
                    if (data) {
                        res.status(200).json({
                            status: "Success",
                            message: data
                        })
                    }
                    else {
                        res.status(404).json({
                            status: "Error",
                            message: "Stantion not found"
                        })
                    }
                })
                .catch(e => {
                    console.log("error", e);
                    res.status(404).json({
                        status: "Error",
                        message: e
                    })
                })
        } catch {
            return
        }


    }
    else {
        res.status(409).json({
            status: "Error",
            message: "Bad request",
        })
    }
}
async function getAllStantions(req: any, res: any) {
    if ((typeof req === 'object') &&
        ('body' in req) &&
        (typeof req.body === 'object') &&
        (checkReqForGetAllStantions(req.body))) {
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
            if (req.body.filter.nameContains) {
                wherePreparatory.push({
                    [Op.or]: [
                        { nimi: { [Op.like]: `%${req.body.filter.nameContains}%` } },
                        { namn: { [Op.like]: `%${req.body.filter.nameContains}%` } },
                        { name: { [Op.like]: `%${req.body.filter.nameContains}%` } }]
                })
            }
            if (req.body.filter.adressContains) {
                wherePreparatory.push({
                    [Op.or]: [
                        { osoite: { [Op.like]: `%${req.body.filter.adressContains}%` } },
                        { adress: { [Op.like]: `%${req.body.filter.adressContains}%` } }]
                })
            }
            if (req.body.filter.operaattorContains) {

                wherePreparatory.push({
                    operaattor: { [Op.like]: `%${req.body.filter.operaattorContains}%` }
                })
            }
            if (req.body.filter.kapasiteetMore) {
                wherePreparatory.push({
                    kapasiteet: { [Op.gt]: req.body.filter.kapasiteetMore }
                })
            }
        }
        if (wherePreparatory) {
            findOptions.where = {
                [Op.and]: wherePreparatory,
            };
        }
        try {
            const count = await Stantions.count({
                where: {
                    [Op.and]: wherePreparatory,
                }
            })
            const stantions = await Stantions.findAll(
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

async function getIdNameStantions(req: any, res: any) {
    if ((req) &&
        (typeof req === "object") &&
        ('body' in req) &&
        Object.keys(req.body).length === 0
    ) {

        console.log(req.body)
        const stantions = await Stantions.findAll({
            attributes: ["id", "name"],
            order: ["name"]
        }
        )
        res.status(200).json(
            {
                status: "Success",
                stantions
            }
        )
    }
    else {
        res.status(409).json({
            status: "Error",
            message: "Bad request",
        })
    }
}
async function getDataStantionFromId(req: any, res: any) {
    if ((typeof req === 'object') &&
        ('body' in req) &&
        (typeof req.body === 'object') &&
        checkReqForStantionGet(req.body)) {
        let dateStart = new Date()
        dateStart.setMonth(dateStart.getMonth() - 1)
        dateStart.setDate(1)
        let dateEnd = new Date()
        dateEnd.setDate(1)
        const stantionBasic = await Stantions.findByPk(req.body.stantion, { attributes: ['id', 'nimi', 'namn', 'name', 'osoite', 'adress', 'kaupunki', 'stad', 'operaattor', 'kapasiteet', 'positionX', 'positionY'] })
        const stantionTravels = await Travel.findAll(
            {
                attributes: [
                    [Sequelize.literal(`COUNT(CASE WHEN departure_station_id = ${req.body.stantion} THEN 1 END)`), "departures_count"],
                    [Sequelize.literal(`COUNT(CASE WHEN return_station_id = ${req.body.stantion} THEN 1 END)`), "returns_count"],
                    [Sequelize.literal(`COUNT(CASE WHEN departure_station_id = ${req.body.stantion} AND departure_time >= '${dateStart.toISOString().split('T')[0]}' AND departure_time <= '${dateEnd.toISOString().split('T')[0]}' THEN 1 END)`), "departures_last_month"],
                    [Sequelize.literal(`COUNT(CASE WHEN return_station_id = ${req.body.stantion} AND departure_time >= '${dateStart.toISOString().split('T')[0]}' AND departure_time <= '${dateEnd.toISOString().split('T')[0]}' THEN 1 END)`), "returns_last_month"]
                ],
                where: {
                    [Op.or]: [{ departure_station_id: req.body.stantion }, { return_station_id: req.body.stantion }]
                }
            }
        )
        if (stantionBasic && stantionTravels) {
            res.status(200).json({
                status: "Success",
                stantionBasic,
                stantionTravels: stantionTravels[0]
            })
        }
        else {
            res.status(200).json({
                status: "Error"
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


export { saveBaseStantionsPack, getStantionInfo, getAllStantions, getIdNameStantions, getDataStantionFromId }

