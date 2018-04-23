import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewDispositivoPage } from '../new-dispositivo/new-dispositivo';
import { Usuario } from '../../models/usuario';
import { HomePage } from '../../pages/home/home';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the UsuarioPage page.
 *
 * Página para dar de alta nuevos usuarios y modificar existentes
 * Aquí relacionaremos un usuario con un dispositivo concreto 
 *
 */

@IonicPage() 
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  public usuario : Usuario;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _firebaseService: FirebaseServiceProvider,
    private alertCtrl: AlertController
  ) {
    // si estamos en modo new inicializamos el usuario
    this.usuario = new Usuario('', '', '', '', 0, '', '');
    // si es edit los datos del usuario los tendremos, o bien pasados directamente o a partir por ejemplo del id buscar el resto de base de datos
  }

  ionViewDidLoad() {
    
  }

  newUser(usuario: Usuario) {
    // conectamos con base de datos y damos de alta un nuevo usuario
    this._firebaseService.newUsuario(usuario);
  }

  editUser() {
    // editamos los datos de un usuario existente 
  }

  myCallbackFunction = function(_params) {
    return new Promise((resolve, reject) => {
      this.usuario = _params;
      resolve();
    });
  }

  // Función que abre la ventana de busqueda de dispositivos
  asignarDispositivo() {    
    this.usuario.id_dispositivo = ''; // si ya tenía uno asignado se lo quitamos
    // navegamos a ventana de busqueda de dispositivos pasandole el usuario y el callback para añadir el dispositivo
    this.navCtrl.push(NewDispositivoPage, { usuario: this.usuario, callback: this.myCallbackFunction});
  }

  // Función para quitar dispositivo asignado al usuario
  desasignarDispositivo() {    
    this.usuario.id_dispositivo = '';
  }

  // guardamos los datos en bbdd y navegamos a inicio
  guardar() {    
    console.log('TODO Guardamos el usuario ', this.usuario);
    this.newUser(this.usuario);
    this.presentAlert();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.goToRoot;    
  }

  // alert de aviso de nuevo usuario
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Nuevo usuario',
      subTitle: 'Usuario nuevo registrado correctamente.',
      buttons: ['Cerrar']
    });
    alert.present();
  }

}
