import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';


@NgModule({
  declarations: [
    MiniMapComponent,
    FullScreenComponent,
    MarcadoresComponent,
    PropiedadesComponent,
    ZoomRangeComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
