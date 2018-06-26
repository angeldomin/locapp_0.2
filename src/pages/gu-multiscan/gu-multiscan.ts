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
  refresh: any;

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

    // lanzo un scan porque si no no se pueden conectar después
    this._ble.scan([], 10).subscribe(response => {
      console.log(response);
    });

    this.listaUsuarioRSSI = [];
    this.intervals = [];
    this.grupo.usuarios.forEach(usuario => {
      this.listaUsuarioRSSI.push(new ParUsuarioRSSI(usuario.nombre, usuario.id_dispositivo, 0, 
        usuario.distancia_warning, usuario.distancia_danger, false, false, {lower:usuario.distancia_warning, upper:usuario.distancia_danger}));
      this.intervals.push(-1);
    });
    this.aviso1=false;
    
    this.warningsRef = this.warningsSalida$.subscribe(response => {     // debugger;
      let warning = false;
      let danger = false;
      response.forEach(element => {      
        if (element.warning && !element.danger) {         
          warning = true;
        }
        if (element.danger) {
          danger = true;
        }        
      });
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
    this.stopDanger();
    for (let i = 0; i < this.listaUsuarioRSSI.length; i++) {
      this.listaUsuarioRSSI[i].danger = false;
      this.listaUsuarioRSSI[i].warning = false;
    }
  }


  buscar(par: ParUsuarioRSSI) { 
    this.intervals[this.listaUsuarioRSSI.indexOf(par)] =
    setInterval(()=>{
      this._ble.readRSSI(par.uuid).then(
      rssi => {
        console.log(par.uuid+' RSSI -> ', rssi);
        // en vez de guardar el valor que llega guardamos la media entre el que llega y el que tenemos
        this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].rssi = Math.trunc((this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].rssi + rssi)/2);
        console.log(par.uuid+' MEDIA RSSI -> ', this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].rssi);
        let metros = this.rssi2meter(this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].rssi);
        let distanciaWarning = this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].distancias.lower;
        let distanciaDanger = this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].distancias.upper;
        console.log('Metros-> ', metros, ' DistanciaWarning-> ', distanciaWarning,' DistanciaDanger-> ', distanciaDanger);
        if (metros >= distanciaWarning) {
          this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].warning=true;
          this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].danger=false;
        }
        if (metros >= distanciaDanger) {
          this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].danger=true;
          this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].warning=false;
        }
        if (metros <= distanciaWarning) {
          this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].danger=false; 
          this.listaUsuarioRSSI[this.listaUsuarioRSSI.indexOf(par)].warning=false;
        }        
        this.warnings.next(this.listaUsuarioRSSI);
      }, error => {
        console.log(error);
        this._ble.connect(par.uuid).subscribe(
          peripheralData => {
              console.log(peripheralData);                       
          }, peripheralData => { 
              console.log('disconnected', peripheralData); 
          });
      });                                                 
    }, 700);
  }

  // RSSI to meter convertor
  rssi2meter(rssi) {
    const A=-60;
    const N=2;
    return Math.trunc(Math.pow(10, ((A-rssi)/(10.0*N))));
    // https://iotandelectronics.wordpress.com/2016/10/07/how-to-calculate-distance-from-the-rssi-value-of-the-ble-beacon/
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
    this.desconectar();
    clearInterval(this.refresh);
    this.navCtrl.pop();
  }

  radar(par) {
    this.navCtrl.push(BuscadorPage, {par: ParUsuarioRSSI});
  }

  refrescar() {    
    this.refresh = setInterval(()=>{
      console.log('refrescar');                                                   
    }, 200);
  }

}
