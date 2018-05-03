import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profesional } from '../../models/profesional';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-su-listado-profesionales',
  templateUrl: 'su-listado-profesionales.html',
})
export class SuListadoProfesionalesPage {

  searchTerm: string = '';
  searchControl: FormControl;
  profesionales: Profesional[];
  searching: any = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuListadoProfesionalesPage');
    this.buscarProfesionales();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.buscarProfesionales();
    })
  }

  onSearchInput() {
    this.searching = true;
  }

  buscarProfesionales() {
    // firebaseService.getListaProfesionales(seachTerm)

    // simulado
    this.profesionales = [
      new Profesional('', 'P1', 'AP1', 'AP2', 'USER', 'PASS1'),
      new Profesional('', 'P2', 'AP12', 'AP22', 'USER2', 'PASS2'),
      new Profesional('', 'P3', 'AP13', 'AP23', 'USER3', 'PASS3')
    ]
  }

  editar(profesional: Profesional) {
    // navegamos a pantalla su-alta-edit en modo edit
    // toast aviso actualizado correctamente
  }

  borrar(profesional: Profesional) {
    // ventana de confirmacion y dentro:
    // firebaseService.deleteProfesional(profesional)
    // aviso borrado correcto
  }

  volver() {
    // regresar a pantalla anterior, menu de superusuario
  }

}
