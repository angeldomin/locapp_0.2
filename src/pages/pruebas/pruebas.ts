import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AudioServiceProvider } from '../../providers/audio-service/audio-service';
import { BleServiceProvider } from '../../providers/ble-service/ble-service';

/**
 * Generated class for the PruebasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pruebas',
  templateUrl: 'pruebas.html',
})
export class PruebasPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public audioService: AudioServiceProvider,
    public _ble: BleServiceProvider
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PruebasPage');
  }

  warning() { console.log('warning pulsado');
    this.audioService.warning();
  }

  stopWarning() {
    this.audioService.stopWarning();
  }

  danger() { console.log('danger pulsado');
    this.audioService.danger();
  }

  stopDanger() {
    this.audioService.stopDanger();
  }

  conectar() {
    let itagUUID = 'FF:FF:B0:00:4B:2D';
    this._ble.conectar(itagUUID); 
  }

  conectarPokemon() {
    let itagUUID = '7C:BB:8A:28:97:E6';
    this._ble.conectar(itagUUID);
  }

  conectarMyBand() { 
    let itagUUID = 'D7:E6:78:60:AB:0F';
    this._ble.conectar(itagUUID);
  }

}
