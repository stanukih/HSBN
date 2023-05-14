interface success {
    status: 'Success',
    message: string,    
}

interface error{
    status: 'Error',
    message: string, 
    error?:Error|string  
}

type IMessage = success|error
interface Idata{
    id:string,
    mimetype:string
}
interface successData {
    status: 'Success',
    message: Idata[]    
}
interface successDataFromAddMedia{
    status: 'Success',
    message: Idata
}
type IMessageData=successData|error
type IMessageDataFromAddMedia=successDataFromAddMedia|error
export {IMessage,IMessageData, Idata, IMessageDataFromAddMedia}