import express = require('express')
import { saveBaseTravelsPack,getAllTravels, loadingFileFree,getAllError } from '../controllers/travels';
const travelRouter = express.Router()
import passport from 'passport'
import { upload } from '../middleware/media'

travelRouter.post('/import_travels', passport.authenticate('jwt',{session: false}), upload.single('filedata'), saveBaseTravelsPack)
travelRouter.post('/get_all_travels', getAllTravels)
travelRouter.post('/loading_file_free', loadingFileFree)
travelRouter.post('/get_all_errors',passport.authenticate('jwt',{session: false}), getAllError)

export{travelRouter}