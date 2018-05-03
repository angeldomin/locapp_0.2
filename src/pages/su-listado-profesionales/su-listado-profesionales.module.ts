import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuListadoProfesionalesPage } from './su-listado-profesionales';

@NgModule({
  declarations: [
    SuListadoProfesionalesPage,
  ],
  imports: [
    IonicPageModule.forChild(SuListadoProfesionalesPage),
  ],
})
export class SuListadoProfesionalesPageModule {}
