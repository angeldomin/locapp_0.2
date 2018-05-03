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
    // redirigimos a pantalla de profesional en modo new
  }

  edicion() {
    console.log('edicion');
    // redirigimos a listado de profesionales donde se podrá editar o borrar
  }

  salir() {
    console.log('salir');
    // redirigimos a la pantalla de login
  }
}
