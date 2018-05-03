import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profesional } from '../../models/profesional';

@IonicPage()
@Component({
  selector: 'page-su-alta-edit',
  templateUrl: 'su-alta-edit.html',
})
export class SuAltaEditPage {

  profesional: Profesional;
  modo: String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    if (navParams.get('profesional')) {
      this.profesional = navParams.get('profesional');
    } else {
      this.profesional = new Profesional('', '', '', '', '', '');
    }
    if (navParams.get('mode')) {
      this.modo = navParams.get('mode');
    } else {
      this.modo = '';
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuAltaEditPage');
  }

  guardar(profesional: Profesional) {
    if (this.modo === 'new') {
      console.log('Guardar nuevo profesional');
      // firebaseService.nuevoProfesional(profesional)
    } else if (this.modo === 'edit') {
      console.log('Editar profesional')
      // firebaseService.editarProfesional(profesional)
    } else {
      console.log('Error al guardar profesional, modo no definido')
      // error al guardar
    }
  }

  volver() {
    console.log('Volver');
  }

}
