import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuMultiscanPage } from './gu-multiscan';

@NgModule({
  declarations: [
    GuMultiscanPage,
  ],
  imports: [
    IonicPageModule.forChild(GuMultiscanPage),
  ],
})
export class GuMultiscanPageModule {}
