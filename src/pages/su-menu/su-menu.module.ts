import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuMenuPage } from './su-menu';

@NgModule({
  declarations: [
    SuMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(SuMenuPage),
  ],
})
export class SuMenuPageModule {}
