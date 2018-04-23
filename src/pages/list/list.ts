import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { BuscadorPage } from '../buscador/buscador';
import { Subscription } from 'rxjs/Subscription';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { UsuarioPage } from '../usuario/usuario';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  selectedUser: any;
  usuarios: Usuario[];
  usuariosRef: Subscription;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _firebaseService: FirebaseServiceProvider) {

    // traemos de base de datos la lista de usuarios registrados
    // nos suscribimos a observable de usuarios, la lista de usuarios guardados en base de datos
    this.usuariosRef = this._firebaseService.usuariosSalida$.subscribe(response => {
      this.usuarios = response;
    })

  }

  seleccionar(usuario) {
    this.selectedUser = usuario;
  }
  
  buscar(usuario) {
    this.navCtrl.push(BuscadorPage, {usuario: usuario, mode: 'edit'});
  }

  nuevoUsuario() {
    this.navCtrl.push(UsuarioPage, {});
  }

}
