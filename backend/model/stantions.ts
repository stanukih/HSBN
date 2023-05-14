import { DataTypes } from "sequelize"
import { sequelizeConnect } from "../middleware/sequelizeConnect"
import { User } from "./user"

const sequelize = sequelizeConnect.get()

const Stantions = sequelize.define(
  'appStantions',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    fid: {
      type: DataTypes.INTEGER,
    },
    nimi: {
      type: DataTypes.STRING,
    },
    namn: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING
    },
    osoite: {
      type: DataTypes.STRING,
    },
    adress: {
      type: DataTypes.STRING
    },
    kaupunki: {
      type: DataTypes.STRING
    },
    stad: {
      type: DataTypes.STRING
    },
    operaattor: {
      type: DataTypes.STRING
    },
    kapasiteet: {
      type: DataTypes.INTEGER
    },
    positionX: {
      type: DataTypes.FLOAT
    },
    positionY: {
      type: DataTypes.FLOAT
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
    }
  },
  {
    paranoid: true
    // Здесь определяются другие настройки модели
  }
)
// Stantions.hasOne(Travel, { foreignKey: 'departure_station_id', sourceKey: 'id', as: 'departureTravel' });
// Stantions.hasOne(Travel, { foreignKey: 'return_station_id', sourceKey: 'id', as: 'returnTravel' });
//GameAct.belongsTo(Game, {foreignKey: 'id'})
export { Stantions }