import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SuMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-su-menu',
  templateUrl: 'su-menu.html',
})
export class SuMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuMenuPage');
  }

  alta() {
    console.log('alta');
  }

  edicion() {
    console.log('edicion');
  }

  borrado() {
    console.log('borrado');
  }

  salir() {
    console.log('salir');
  }
}
