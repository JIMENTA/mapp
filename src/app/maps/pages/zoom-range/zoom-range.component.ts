import { AfterViewInit, Component, ElementRef,  OnDestroy,  ViewChild } from '@angular/core';
import * as  mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .map-container{
      height:100%;
      width:100%
    }

    .row{
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index:999;
      width:400px
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMap !: ElementRef;
  map !: mapboxgl.Map;
  zoomLevel : number = 10;
  center: [number, number] = [2.175538776883486 , 41.394998316604685]

  constructor() { }

  ngOnDestroy(): void {
    //elimina todas las llamadas los listener 
      this.map.off('zoom', () =>{});
      this.map.off('zoomend', () =>{});
      this.map.off('move', () =>{});
  }

  ngAfterViewInit(): void {
     this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom: this.zoomLevel
    });

    this.map.on('zoom', (ev) => {
      this.zoomLevel = this.map.getZoom()
    })
    this.map.on('zoomend', (ev) => {
     if(this.map.getZoom() > 18){
      this.map.zoomTo(18);
     }
    })

    //moviemientos en el mapa
    this.map.on('move', (event) => {
      const target = event.target;
      const {lng, lat} = target.getCenter();
      this.center = [lng, lat];
    })
     
  }

  zoomOut() {
    this.map.zoomOut()

  }

  zoomIn(){
    this.map.zoomIn()
  }
  zoomChanged( value :string ){
    this.map.zoomTo(Number(value))
  }

}
