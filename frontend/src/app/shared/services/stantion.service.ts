import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Stantion {
  fid?:Number;
  id?:Number;
  nimi?:String;
  namn?:String;
  name?:String;
  osoite?:String;
  adress?:String;
  kaupunki?:String;
  stad?:String;
  operaattor?:String;
  kapasiteet?:Number;
  positionX?:Number;
  positionY?:Number;
}


interface getStantions{
  page:number,
  size:number,
  sort:string,
  fields:string[],
}

@Injectable({
  providedIn: 'root'
})
export class StantionsService {
  getStantions(data:getStantions): Observable<any> {
    return this.http.post<any>(`/api/stantions/get_all_stantions`,data)
}
  getIdNameStantions():Observable<any>{
    return this.http.post<any>(`/api/stantions/get_id_name_stantions`,null)
  }

  getDataStantionFromId(data:number):Observable<any>{
    console.log("data=",data)
    return this.http.post<any>(`/api/stantions/get_data_stantion_from_id`,{stantion:data})
  }

  
constructor(private http: HttpClient) {}
}
