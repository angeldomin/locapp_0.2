import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DispositivosPage } from './dispositivos';

@NgModule({
  declarations: [
    DispositivosPage,
  ],
  imports: [
    IonicPageModule.forChild(DispositivosPage),
  ],
})
export class DispositivosPageModule {}
