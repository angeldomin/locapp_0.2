import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Grupo } from '../../models/grupo';
import { ParUsuarioRSSI } from '../../models/par-usuario-rssi';
import { Subscription } from 'rxjs/Subscription';
import { BLE } from '@ionic-native/ble';
import { AudioServiceProvider } from '../../providers/audio-service/audio-service';
import { Subject } from 'rxjs/Subject';
import { BuscadorPage } from '../buscador/buscador';

@IonicPage()
@Component({
  selector: 'page-gu-multiscan',
  templateUrl: 'gu-multiscan.html',
})
export class GuMultiscanPage {

  grupo: Grupo;
  listaUsuarioRSSI: ParUsuarioRSSI[];
  conectado = false;
  paresUsuarioRSSIRef: Subscription  = null;
  intervals: number[];
  aviso1: boolean;

  private warnings = new Subject<any>();
  public warningsSalida$ = this.warnings.asObservable();

  warningsRef: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public audioService: AudioServiceProvider,
    private _ble: BLE,
    private toastCtrl: ToastController
  ) {
    if (navParams.get('grupo')) {
      this.grupo = navParams.get('grupo');
    } else {
      this.grupo = new Grupo('', '', []);
    }
    this.listaUsuarioRSSI = [];
    this.intervals = [];
    this.grupo.usuarios.forEach(usuario => {
      this.listaUsuarioRSSI.push(new ParUsuarioRSSI(usuario.nombre, usuario.id_dispositivo, 0, false, false));
      this.intervals.push(-1);
    });
    this.aviso1=false;
    
    this.warningsRef = this.warningsSalida$.subscribe(response => {     // debugger;
      response.forEach(element => {
        let warning = false;
        let danger = false;
        if (element.warning && !element.danger) {         
          warning = true;
        }
        if (element.danger) {
          danger = true;
        } 
        if (warning) {
          this.warning();
        } else {
          this.stopWarning();
        }
        if (danger) {
          this.danger();
        } else {
          this.stopDanger();
        }
      });
    });
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuMultiscanPage');   
  }  

  conectar() {
    this.conectado = true;
    console.log(this.listaUsuarioRSSI);    

    for (let i = 0; i < this.listaUsuarioRSSI.length; i++) {
      const uuid = this.listaUsuarioRSSI[i].uuid;
      this._ble.isConnected(uuid).then(
        () => {
          console.log('Estaba conectado.');
          this._ble.disconnect(uuid); console.log('xx Nos desconectamos del dispositivo ', uuid);
          let toast = this.toastCtrl.create({
              message: 'El dispositivo se ha desconectado.',
              duration: 3000,
              position: 'middle'
            }); 
          toast.present();
        },
        () => {
          console.log('No estaba conectado');
          this._ble.connect(uuid).subscribe(
              peripheralData => {
                  console.log(peripheralData);
                  this.buscar(this.listaUsuarioRSSI[i]);                                   
              }, peripheralData => { 
                  console.log('disconnected', peripheralData); 
              });
        }
      )
    }
    console.log(this.listaUsuarioRSSI);
  }

  desconectar() {console.log(this.listaUsuarioRSSI);
    this.conectado = false;   
    this.intervals.forEach(interval => {
      clearInterval(interval);
    });
    this.grupo.usuarios.forEach(usuario => {
      this._ble.disconnect(usuario.id_dispositivo);
    });
    this.stopWarning();    
  }


  buscar(par: ParUsuarioRSSI) { 
    this.intervals[this.listaUsuarioRSSI.indexOf(par)] =
    setInterval(()=>{
      this._ble.readRSSI(par.uuid).then(
      rssi => {
        console.log(par.uuid+' RSSI -> ', rssi);
        this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].rssi = rssi;
        // this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].rssi = this.rssi2meter(rssi, 62, 4);
        if (rssi<-77) { 
          //this.warning();
          this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].warning=true;
          //this.stopDanger();
          this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].danger=false;
        }
        if (rssi<-80) {
          //this.danger();
          this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].danger=true;
          //this.stopWarning();
          this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].warning=false;
        }
        if (rssi>-75) {
          //this.stopDanger(); this.stopWarning();
          this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].danger=false; 
          this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].warning=false;
        }
        this.warnings.next(this.listaUsuarioRSSI);
      }, error => {
        console.log(error); 
      });                                                 
    }, 1000); 
  }

  // RSSI to meter convertor
  rssi2meter(rssi, A, n) {
    // A=62;
    // n=4.21
    return Math.pow(10, (-(rssi+A)/(10.0*n)));
  }

  warning() { console.log('warning pulsado');
    this.audioService.warning();
    this.aviso1 = true;
  }

  stopWarning() {
    this.audioService.stopWarning();
    this.aviso1 = false;
  }

  danger() { console.log('danger pulsado');   
    this.audioService.danger();
  }

  stopDanger() {
    this.audioService.stopDanger();
  }
  

  volver() {
    this.navCtrl.pop();
  }

  radar(par) {
    this.navCtrl.push(BuscadorPage, {par: ParUsuarioRSSI});
  }

}
