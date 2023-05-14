import { Sequelize } from 'sequelize';
import databaseSettingAuthFromFile from "../../shared/config/dataBase.setting.json"; //
import { IDBMSsetingsServer } from '../../shared/interfaces/IbdSettings';
import { isIDBMSsetingsServer } from '../../shared/typeGuards/bdSettings';

class sequelizeConnect {
    private static instance: sequelizeConnect
    private static databaseSettingAuth:IDBMSsetingsServer = databaseSettingAuthFromFile as IDBMSsetingsServer
    private static connectionLine = ''   
    public static loading:boolean=false     
    static sequelize: Sequelize;
    private constructor() {        
    }
    private static connect():void{
        if (isIDBMSsetingsServer(sequelizeConnect.databaseSettingAuth)) {  
            sequelizeConnect.connectionLine=`${sequelizeConnect.databaseSettingAuth.dialect}://${sequelizeConnect.databaseSettingAuth.login}:${sequelizeConnect.databaseSettingAuth.password}@${sequelizeConnect.databaseSettingAuth.host}:${sequelizeConnect.databaseSettingAuth.port}/${sequelizeConnect.databaseSettingAuth.database}`                
            this.sequelize = new Sequelize(sequelizeConnect.connectionLine)}            
        else {
            console.log("Erron in config file")
            throw new Error("Erron in config file")
        }                       
        this.sequelize.authenticate()
        .then(()=>{console.log('Connect to databases success')})
        .catch((e)=>{console.log('Connect to databases error',e)})
    }
    public static get(): Sequelize {
        if (!sequelizeConnect.instance) {
            sequelizeConnect.instance = new sequelizeConnect()
            this.connect()
        }
        return sequelizeConnect.sequelize
    }    
}


export { sequelizeConnect }