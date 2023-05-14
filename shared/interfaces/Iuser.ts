interface IuserEmail{
    email: string
}
interface IuserCreating extends IuserEmail {    
    password: string,    
    adminKey: string
}
interface IuserConfirmation extends IuserEmail{
    verifiedСonfirmation: string,    
}
interface IuserLogin extends IuserCreating{

}
interface IuserForRecovery extends IuserCreating{
    verifiedСonfirmation: string,   
}
export {IuserCreating, IuserConfirmation,IuserLogin, IuserForRecovery, IuserEmail}