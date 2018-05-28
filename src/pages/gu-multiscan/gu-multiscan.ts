import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { BleServiceProvider } from '../../providers/ble-service/ble-service';
import { Grupo } from '../../models/grupo';
import { ParUsuarioRSSI } from '../../models/par-usuario-rssi';

@IonicPage()
@Component({
  selector: 'page-gu-multiscan',
  templateUrl: 'gu-multiscan.html',
})
export class GuMultiscanPage {

  grupo: Grupo;
  listaUsuarioRSSI: ParUsuarioRSSI[];
  conectado = false;

  constructor(
    public navCtrl: NavController,
    public _firebaseService: FirebaseServiceProvider,
    private alertCtrl: AlertController,
    public _bleService: BleServiceProvider,
    public navParams: NavParams
  ) {
    if (navParams.get('grupo')) {
      this.grupo = navParams.get('grupo');
    } else {
      this.grupo = new Grupo('', '', []);
    }
    this.listaUsuarioRSSI = [];
    this.inicializarListaUsuarioRSSI();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuMultiscanPage');
  }

  inicializarListaUsuarioRSSI() {
    this.grupo.usuarios.forEach(usuario => {
      this.listaUsuarioRSSI.push(new ParUsuarioRSSI(usuario.nombre, usuario.id_dispositivo, 0, false, false));
    });
  }

  conectar() {
    this.conectado = true;
  }

  desconectar() {
    this.conectado = false;
  }

  volver() {
    this.navCtrl.pop();
  }

}
