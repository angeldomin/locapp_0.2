import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuAltaEditPage } from '../su-alta-edit/su-alta-edit';
import { SuListadoProfesionalesPage } from '../su-listado-profesionales/su-listado-profesionales';

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
    this.navCtrl.push(SuAltaEditPage, {mode: 'new'}) // redirigimos a pantalla de profesional en modo new
  }

  edicion() {    
    this.navCtrl.push(SuListadoProfesionalesPage); // redirigimos a listado de profesionales donde se podrá editar o borrar
  }

  salir() {
    console.log('salir');
    this.navCtrl.pop();
  }
}
