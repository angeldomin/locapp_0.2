import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { BuscadorPage } from '../buscador/buscador';
import { Subscription } from 'rxjs/Subscription';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { UsuarioPage } from '../usuario/usuario';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { BleServiceProvider } from '../../providers/ble-service/ble-service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  selectedUser: any;
  usuarios: Usuario[];
  usuariosRef: Subscription;
  grupo: String;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _firebaseService: FirebaseServiceProvider,
    private alertCtrl: AlertController,
    private _bleService: BleServiceProvider
  ) {
    if (navParams.get('grupo')) {
      this.grupo = navParams.get('grupo');
    } else {
      this.grupo = '';
    }

    // nos suscribimos a observable de usuarios, la lista de usuarios guardados en base de datos
    this.usuariosRef = this._firebaseService.usuariosSalida$.subscribe(response => {
      this.usuarios = response;
    })

  }

  seleccionar(usuario) {
    this.selectedUser = usuario;
  }
  
  buscar(usuario) {
    this.navCtrl.push(BuscadorPage, {usuario: usuario});
  }

  // alert de borrado de usuario
  borrar(usuario) {  
    let alert = this.alertCtrl.create({
      title: 'Confirmación de borrado',
      message: '¿Está seguro de que desea borrar el usuario seleccionado?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {            
          }
        },
        {
          text: 'Borrar',
          handler: () => {            
            this._firebaseService.deleteUsuario(usuario)
          }
        }
      ]
    });
    alert.present();
  }

  nuevoUsuario() {
    this.navCtrl.push(UsuarioPage, {});
  }

  editar(usuario: Usuario) {
    this.navCtrl.push(UsuarioPage, {usuario: usuario, mode: 'edit'})
  }

  conectar(usuario: Usuario){
    this._bleService.conectar(usuario.id_dispositivo);
  }

}
