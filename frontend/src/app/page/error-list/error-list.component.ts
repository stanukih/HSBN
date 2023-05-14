import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { TravelService, Error } from 'src/app/shared/services/travel.service';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.scss']
})
export class ErrorListComponent implements OnInit {
  selectedField=['id','data','table', 'fileLoad', 'error']
  dataSource:Error[]=[]
  pageIndex:number=0
  length: number=0
  pageSize: number=10
  pageSizeOptions: number[]=[10,50,100]
  subs!:Subscription
  showFirstLastButtons=true
  state:'success'|'error'|'load'|''=''
  errorLoad:any
  ngOnInit(): void {   
    this.loadData()
  }
  onPaginate(pageEvent: PageEvent) {    
    this.pageIndex=pageEvent.pageIndex
    this.pageSize = pageEvent.pageSize;
    
    this.loadData()
  }

  loadData():void{
    this.state='load'    
    this.travelService.getErrors({page:this.pageIndex,
      size:this.pageSize,}).subscribe((error) =>{   
      this.state='success'     
      if (error.status==="Success"){
      this.length=parseInt(error.count)
      this.dataSource=error.errorsDB}
    },
    (error)=>{
      this.state='error'
      this.errorLoad=error
      this.dataSource=[]
    })}

    constructor (public travelService:TravelService){}
}
