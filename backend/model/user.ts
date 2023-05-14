import { DataTypes,UUIDV4 } from "sequelize"
import { sequelizeConnect } from "../middleware/sequelizeConnect"

const sequelize = sequelizeConnect.get()

const User = sequelize.define(
    'appUser',
    {
      id:{
        type: DataTypes.UUID, 
        defaultValue: UUIDV4,
        primaryKey:true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
      },
      verifiedСonfirmation:{
        type: DataTypes.STRING
      }
    },
    {
      paranoid: true
      // Здесь определяются другие настройки модели
    }
  )

  // Media.belongsTo(User, {
  //   foreignKey: 'userRef'
  // });
  // Game.belongsTo(User, {
  //   foreignKey: 'userRef'
  // });
  // User.hasMany(Media, {
  //   foreignKey: 'userRef'
  // });  
  // User.hasMany(Game, {
  //   foreignKey: 'userRef'
  // });  
 
  
  export {User}