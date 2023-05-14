import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StantionsService, Stantion } from '../../shared/services/stantion.service';
import {PageEvent} from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-stations-list',
  templateUrl: './stations-list.component.html',
  styleUrls: ['./stations-list.component.scss']
})
export class StationsListComponent implements OnInit{

  sortField:string="fid"
  dataSource:Stantion[]=[]
  pageIndex:number=0
  length: number=0
  pageSize: number=10
  pageSizeOptions: number[]=[10,50,100]
  formSettings!: FormGroup
  
  selectedField=['id','nimi','namn','name','osoite','adress','kaupunki','stad','operaattor','kapasiteet']
  
  filterInput!:string
  subs!:Subscription
  showFirstLastButtons=true
  state:'success'|'error'|'load'|''=''
  errorLoad:any
  sortFields = [
    {viewValue: 'id' },
    {viewValue: 'nimi' },
    {viewValue: 'namn' },
    {viewValue: 'name' },
    {viewValue: 'osoite' },
    {viewValue: 'adress' },
    {viewValue: 'kaupunki' },
    {viewValue: 'stad' },
    {viewValue: 'operaattor' },
    {viewValue: 'kapasiteet' },
  ]
   

  ngOnInit(): void {   
    this.formSettings = new FormGroup({
      nameContains: new FormControl(null),
      adressContains:new FormControl(null),
      operaattorContains:new FormControl(null),
      kapasiteetMore:new FormControl(null),
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
    const getStantionsSettings={
      fields:this.selectedField,
      page:this.pageIndex,
      size:this.pageSize,
      sort:this.sortField,
      filter:this.formSettings.value
    }
    this.stantionService.getStantions(getStantionsSettings).subscribe((stantion) =>{   
      this.state='success'     
      if (stantion.status==="Success"){
      this.length=parseInt(stantion.count)
      this.dataSource=stantion.stantions}
    },
    (error)=>{
      this.state='error'
      this.errorLoad=error
      this.dataSource=[]
    })    
  }
  constructor (public stantionService:StantionsService){}
}
