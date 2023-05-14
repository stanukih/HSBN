import express = require('express')
import { saveBaseStantionsPack,getStantionInfo,getAllStantions,getIdNameStantions, getDataStantionFromId} from '../controllers/stantions';
const stantionRouter = express.Router()
import passport from 'passport'
import { upload } from '../middleware/media'

stantionRouter.post('/import_stantions', passport.authenticate('jwt',{session: false}), upload.single('filedata'), saveBaseStantionsPack)
stantionRouter.post('/get_all_stantions', getAllStantions)
stantionRouter.post('/get_stantion_info', getStantionInfo)
stantionRouter.post('/get_id_name_stantions', getIdNameStantions)
stantionRouter.post('/get_data_stantion_from_id', getDataStantionFromId)



export{stantionRouter}