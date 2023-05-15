import passport from 'passport'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { authRouter } from './routes/auth'
import { sequelizeConnect } from "./middleware/sequelizeConnect"
import appSettingsFromFile from "../shared/config/appSettings.json"; 
import {IAppSettings} from "../shared/interfaces/appSettings"
import { User } from './model/user'
import { Stantions } from './model/stantions'
import { Travel } from './model/travels'
import { stantionRouter } from './routes/stantions'
import { travelRouter } from './routes/travels'
import * as path from 'path'


const appSettings = appSettingsFromFile as IAppSettings
const app = express()
const sequelize = sequelizeConnect.get()
console.log(sequelize)

if (appSettings.install){
    sequelize.sync({ alter: true })
}

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(passport.initialize())
require("./middleware/passport").passport(passport)

Stantions.belongsTo(User,{
  foreignKey:"userRef"
})
Travel.belongsTo(User,{
  foreignKey:"userRef"
})

  
Stantions.hasMany(Travel, { foreignKey: 'departure_station_id', as: 'departureTravels' });
Stantions.hasMany(Travel, { foreignKey: 'return_station_id', as: 'returnTravels' });


// Stantions.hasMany(Travel, {
//     foreignKey: 'gameRef'
//   }); 
 
  /*
  User.hasMany(Game, {
    foreignKey: 'userRef'
  });*/
  
app.use('/api/auth', authRouter) 
app.use('/api/stantions', stantionRouter)
app.use('/api/travels', travelRouter)
if (process.env["NODE_ENV"]){
  app.use(express.static('../frontend/dist/client'))
  app.get('*',(_req,res)=>{
    res.sendFile(
      path.resolve(
        __dirname, '../../../','frontend','dist','client','index.html'
      ))
  })
}



export{app}



