import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TravelService, Travel } from '../../shared/services/travel.service';
import {PageEvent} from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent {
  sortField:string="id"
  dataSource:Travel[]=[]
  pageIndex:number=0
  length: number=0
  pageSize: number=10
  pageSizeOptions: number[]=[10,50,100]
  formSettings!: FormGroup
  selectedField=['departure_time','return_time',
  'departure_station_id', 'departure_station_name',
  'return_station_id','return_station_name','distance','duration']  
  filterInput!:string
  subs!:Subscription
  showFirstLastButtons=true
  state:'success'|'error'|'load'|''=''
  errorLoad:any
  sortFields = [
    {viewValue: 'departure_time' },
    {viewValue: 'return_time' },
    {viewValue: 'departure_station_id' },
    {viewValue: 'departure_station_name' },
    {viewValue: 'return_station_id' },
    {viewValue: 'return_station_name' },
    {viewValue: 'distance' },
    {viewValue: 'duration' }
  ]
   

  ngOnInit(): void {   
    this.formSettings = new FormGroup({
      departureStationNameContains: new FormControl(null),
      returnStationNameContains:new FormControl(null),
      distanceMore:new FormControl(null),
      durationMore:new FormControl(null),
      departureTimeMore:new FormControl(null),
      departureTimeLess:new FormControl(null),

    }); 
    this.loadData()
    
  }
  onPaginate(pageEvent: PageEvent) {    
    this.pageIndex=pageEvent.pageIndex
    this.pageSize = pageEvent.pageSize;
    
    this.loadData()
  }
  loadData():void{
    this.state='load'
    const getTravelsSettings={
      fields:this.selectedField,
      page:this.pageIndex,
      size:this.pageSize,
      sort:this.sortField,
      filter:this.formSettings.value
    }
    this.travelService.getTravels(getTravelsSettings).subscribe(
      (travel:any) =>{    
      this.state='success'  
      if (travel.status==="Success"){
      this.length=parseInt(travel.count)
      this.dataSource=travel.stantions}
    },
    (error:any)=>{
      this.state='error'
      this.errorLoad=error
      this.dataSource=[]
    })    
  }
  constructor (public travelService:TravelService){}
}
