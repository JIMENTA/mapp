import { AfterViewInit, Component, ElementRef,  ViewChild } from '@angular/core';
import * as  mapboxgl from 'mapbox-gl';

interface markerColor {
  color: string;
  marker ?: mapboxgl.Marker;
  center ?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .map-container{
      height:100%;
      width:100%
    }

    .list-group{
      position: fixed;
      top: 20px;
      right:20px;
      z-index:99;
    }
    li {
      cursor:pointer;
    }

    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMap !: ElementRef;
  map !: mapboxgl.Map;
  zoomLevel : number = 15;
  center: [number, number] = [2.175538776883486 , 41.394998316604685];

  markers :markerColor[]=[];

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
     container: this.divMap.nativeElement,
     style: 'mapbox://styles/mapbox/streets-v11',
     center:this.center,
     zoom: this.zoomLevel
   });
 
   this.readMarkerToLocalStorage();
  // REFERENCIA COMO PERSONALIZAR / NO LA USO
  //  const markerHtml : HTMLElement = document.createElement('div');
  //  markerHtml.innerHTML = 'como quiero el pin'
  // new mapboxgl.Marker({
  //     element: markerHtml
  //   })
  //  .setLngLat( this.center)
  //  .addTo( this.map)
  }


  addMarker(){
     const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const newMarker = new mapboxgl.Marker({draggable:true, color})
    .setLngLat(this.center)
    .addTo(this.map);

    this.markers.push({
      color,
      marker: newMarker
    })
  
    this.saveMarkerLocalStorage();
  
    newMarker.on('dragend', () =>{
      this.saveMarkerLocalStorage();
    })
  }
  

 


goToMarker( marker : mapboxgl.Marker) {
this.map.flyTo({
  center: marker.getLngLat()
})
}

saveMarkerLocalStorage(){

  const lngLatArr : markerColor[] =[]

  this.markers.forEach( m => {
    const color = m.color;
    const {lng,lat}= m.marker!.getLngLat();

    lngLatArr.push({
      color : color,
      center: [lng ,  lat]
    });
  })

  localStorage.setItem('markers', JSON.stringify(lngLatArr))
}

readMarkerToLocalStorage(){
  if(!localStorage.getItem('markers')){return}

  const lngLatArr: markerColor[] = JSON.parse(localStorage.getItem('markers')!);

lngLatArr.forEach( m => {
  const newMarker = new mapboxgl.Marker({

    color: m.color,
    draggable:true,
  })
  .setLngLat(m.center!)
  .addTo(this.map);

  this.markers.push({
    marker: newMarker,
    color: m.color
  });

newMarker.on('dragend', () =>{
  this.saveMarkerLocalStorage();
})

})

}

deleteMarker( i :number ){
  this.markers[i].marker?.remove();
  this.markers.splice(i, 1);
  this.saveMarkerLocalStorage();
}

}
    