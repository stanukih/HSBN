import { AfterViewInit, Component, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'hsb-map',
  templateUrl: './hsb-map.component.html',
  styleUrls: ['./hsb-map.component.scss']
})
export class MapComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.initMap()
  }
  @Input() positionX!:number
  @Input() positionY!:number

  @Input() mapOpen!:boolean
  zoom: number = 12;

  private map:any;
  

  private initMap(): void {
    this.map = L.map('map', {      
      center: [  this.positionY,this.positionX ],
      zoom: this.zoom
    });
    let markerIcon = L.divIcon({
      html: `
    <svg
      width="24"
      height="40"
      viewBox="0 0 100 100"
      version="1.1"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0 L30 70 L70 0 Z" fill="#590606"></path>
    </svg>`})
    let marker:any = L.marker([this.positionY,this.positionX],{icon:markerIcon}).addTo(this.map);
    const tiles:any = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

      maxZoom: 20,

      minZoom: 3,

      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

    });

    tiles.addTo(this.map);
    
  }
  
}
