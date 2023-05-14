import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Travel {
  id?:Number;
  departure_time?:String;
  return_time?:String;
  departure_station_id?:String;
  departure_station_name?:String;
  return_station_id?:String;
  return_station_name?:String;
  distance?:String;
  duration?:String;
}
export interface Error {
  id?:Number;
  data?:String;
  table?:String;
  fileLoad?:String;
  error?:String;
}


interface getTravels{
  page:number,
  size:number,
  sort:string,
  fields:string[],
}

interface getErrors{
  page:number,
  size:number
}


@Injectable({
  providedIn: 'root'
})
export class TravelService {
  getTravels(data:getTravels): Observable<any> {
    return this.http.post<any>(`/api/travels/get_all_travels`,data)
  }
  getErrors(data:getErrors){
    return this.http.post<any>(`/api/travels/get_all_errors`,data)
  }
    constructor(private http: HttpClient) {}
}
