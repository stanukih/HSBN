interface Istantion{
    stantion: number
}
interface IgetAllStantions{
    fields:string[],
    size:number,
    page:number,
    order?:string,
    filter?:{
        nameContains?:string,
        adressContains?:string,
        operaattorContains?:string,
        kapasiteetMore?:number
    }        
}
export {Istantion,IgetAllStantions}