import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDispositivoPage } from './new-dispositivo';

@NgModule({
  declarations: [
    NewDispositivoPage,
  ],
  imports: [
    IonicPageModule.forChild(NewDispositivoPage),
  ],
})
export class NewDispositivoPageModule {}
