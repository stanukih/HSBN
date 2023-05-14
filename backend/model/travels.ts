import { DataTypes, UUIDV4 } from "sequelize"
import { sequelizeConnect } from "../middleware/sequelizeConnect"
import { User } from "./user"
import { Stantions } from "./stantions"


const sequelize = sequelizeConnect.get()

const Travel = sequelize.define(
  'appTravels',
  {
    
    id:{
      type: DataTypes.UUID, 
      defaultValue: UUIDV4,
      primaryKey:true
    },
    departure_time:{
        type: DataTypes.DATE
    },
    return_time:{
        type: DataTypes.DATE
    },
    
    departure_station_id:{
        type: DataTypes.INTEGER,
        references: {
          model: Stantions,
          key: "id"
        }
    },
    departure_station_name:{
        type: DataTypes.STRING,
    },
    return_station_id:{
      type: DataTypes.INTEGER,
      references: {
        model: Stantions,
        key: "id"
      }
    },
    return_station_name:{
        type: DataTypes.STRING,
    },
    distance:{
        type: DataTypes.INTEGER
    },
    duration:{
        type: DataTypes.INTEGER
    },
    fileLoad: {
      type: DataTypes.STRING
    },
    userRef: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id"
      }
    },
  },
  {
    paranoid: true
    // Здесь определяются другие настройки модели
  }
)
Travel.belongsTo(Stantions, { foreignKey: 'departure_station_id', as: 'departureStation' });
Travel.belongsTo(Stantions, { foreignKey: 'return_station_id', as: 'returnStation' });


export { Travel }