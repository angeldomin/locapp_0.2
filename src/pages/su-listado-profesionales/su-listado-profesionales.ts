import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profesional } from '../../models/profesional';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';
import { SuAltaEditPage } from '../su-alta-edit/su-alta-edit';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-su-listado-profesionales',
  templateUrl: 'su-listado-profesionales.html',
})
export class SuListadoProfesionalesPage {

  searchTerm: string = '';
  searchControl: FormControl;
  profesionales: Profesional[];  
  profesionalesRef: Subscription;
  searching: any = false;

  constructor(
    public navCtrl: NavController,
    public _firebaseService: FirebaseServiceProvider,
    public navParams: NavParams
  ) {
    this.searchControl = new FormControl();

    // nos suscribimos a observable de profesionales, la lista de profesionales guardados en base de datos
    this.profesionalesRef = this._firebaseService.profesionalesSalida$.subscribe(response => {
      this.profesionales = response;
    })
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
    this.navCtrl.push(SuAltaEditPage, {mode: 'edit'}) // navegamos a pantalla su-alta-edit en modo edit    
  }

  borrar(profesional: Profesional) {
    // ventana de confirmacion y dentro:
    this._firebaseService.deleteProfesional(profesional);   
    // aviso borrado correcto
  }

  volver() {
    // regresar a pantalla anterior, menu de superusuario
  }

}
