import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GuListaGruposPage } from '../gu-lista-grupos/gu-lista-grupos';
import { GuAltaEditGruposPage } from '../gu-alta-edit-grupos/gu-alta-edit-grupos';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {  

  }

  cargaGrupos() {
    console.log('carga de grupos');
    this.navCtrl.push(GuListaGruposPage);
  }

  nuevoGrupo() {
    console.log('nuevo grupo');
    this.navCtrl.push(GuAltaEditGruposPage, {mode: 'new'});
  }
  
  gestionaUsuarios() {
    console.log('gestion de usuarios');
    this.navCtrl.push(ListPage);
  }

  salir() {
    console.log('salir');
    this.navCtrl.pop();
  }

} 
