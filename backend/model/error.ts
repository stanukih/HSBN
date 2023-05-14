import { DataTypes, UUIDV4 } from "sequelize"
import { sequelizeConnect } from "../middleware/sequelizeConnect"
import { User } from "./user"

const sequelize = sequelizeConnect.get()

const ErrorsCSV = sequelize.define(
  'appErrorsCSV',
  {
    
    id:{
      type: DataTypes.UUID, 
      defaultValue: UUIDV4,
      primaryKey:true
    },
    data:{
        type:DataTypes.STRING},
    table:{
        type:DataTypes.STRING
    },
    fileLoad: {
      type: DataTypes.STRING
    },
    error:{
      type:DataTypes.STRING
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
//GameAct.belongsTo(Game, {foreignKey: 'id'})
export { ErrorsCSV }