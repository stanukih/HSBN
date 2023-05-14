import { Component, OnInit } from '@angular/core';
import { StantionsService } from 'src/app/shared/services/stantion.service';

@Component({
  selector: 'app-stantion',
  templateUrl: './stantion.component.html',
  styleUrls: ['./stantion.component.scss']
})
export class StantionComponent implements OnInit {

  stantions:idAndNameStantions[]=[]
  stantionTravels!:stantionTravels
  stantionData:any
  load:boolean=false
  mapOpen:boolean=false
  selectedStantion:number|null=null
  state:""|"load"|"success"|"error"=""
  errorLoad: any;

  ngOnInit(){
    this.stantionsService.getIdNameStantions().subscribe((data)=>{
      this.stantions=data.stantions
    this.load=true
    })
    
  }
  loadDataFromCange(){
    this.state="load"
    
    this.stantionsService.getDataStantionFromId(this.selectedStantion!).subscribe(
      (data)=>{
        this.stantionData=data.stantionBasic
        this.stantionTravels=data.stantionTravels
        this.state="success"
        console.log(data.stantionBasic)
      },
      (error)=>{
        this.errorLoad=error
        this.state="error"
      }
      
    )

  }
  constructor(private stantionsService:StantionsService){}
}

interface idAndNameStantions{
  id:number,
  name:string
}

interface stantionTravels{
  departures_count:number,
  returns_count:number,
  departures_last_month:number,
  returns_last_month:number
}