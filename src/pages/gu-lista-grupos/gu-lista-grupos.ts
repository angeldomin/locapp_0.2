import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { Grupo } from '../../models/grupo';
import { Subscription } from 'rxjs/Subscription';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { GuAltaEditGruposPage } from '../gu-alta-edit-grupos/gu-alta-edit-grupos';

@IonicPage()
@Component({
  selector: 'page-gu-lista-grupos',
  templateUrl: 'gu-lista-grupos.html',
})
export class GuListaGruposPage {

  searchTerm: string = '';
  searchControl: FormControl;
  grupos: Grupo[];
  gruposRef: Subscription;
  searching: any = false;

  constructor(
    public navCtrl: NavController,
    public _firebaseService: FirebaseServiceProvider,
    public navParams: NavParams
  ) {
    this.searchControl = new FormControl();

    // nos suscribimos a observable de grupos, la lista de grupos guardados en base de datos
    // this.gruposRef = this._firebaseService.gruposSalida$.subscribe(response => {
    //   this.grupos = response;
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuListaGruposPage');
    this.buscarGrupos();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.buscarGrupos();
    })
  }

  onSearchInput() {
    this.searching = true;
  }

  buscarGrupos() {
    // firebaseService.getListaGrupos(seachTerm)
    // TODO
  }

  editar(grupo: Grupo) {
    this.navCtrl.push(GuAltaEditGruposPage, {grupo: Grupo, mode: 'edit'});    
  }

  borrar(grupo: Grupo) {
    // ventana de confirmacion y dentro:
    // this._firebaseService.deleteGrupo(grupo);   
    // aviso borrado correcto
  }

  volver() {
    this.navCtrl.pop();
  }

}
