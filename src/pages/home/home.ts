import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {  

  }

  cargaGrupos() {
    console.log('carga de grupos');
  }

  nuevoGrupo() {
    console.log('nuevo grupo');
  }
  
  gestionaUsuarios() {
    console.log('gestion de usuarios');
  }

  salir() {
    console.log('salir');
    this.navCtrl.pop();
  }

} 
