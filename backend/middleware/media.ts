import multer =require ('multer')
//import {diskStorage, Multer, Options} from 'multer'
import moment = require('moment')
import { media } from '../../shared/config/appSettings.json'

const storage = multer.diskStorage({
    destination(req, file, cb){
        console.log(req,file)
        cb(null, media.path)
    },
    filename(req, file, cb){
        console.log(req)
        cb(null, moment().format('DDMMYYYY-HHmmss_SSS')+file.originalname)
        //cb(null, 'test')
    }
})


const upload = multer({
    storage, 
    limits:{
        fieldNameSize:50,
        fileSize:media.maxSize,
        files:1,
    },
    fileFilter:async (_req, file, cb)=> {
        if (file.mimetype.includes('csv')){
            cb(null, true)
            }
        else {cb(null, false)}}
});
export{upload}