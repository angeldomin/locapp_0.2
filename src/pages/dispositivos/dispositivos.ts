import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dispositivo } from '../../models/dispositivo'
import { Usuario } from '../../models/usuario';
import { Subscription } from 'rxjs/Subscription';
import { BleServiceProvider } from '../../providers/ble-service/ble-service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/**
 * Generated class for the NewDispositivoPage page.
 *
 * Aquí la búsqueda de dispositivos y asignación a un usuario.
 */

@IonicPage()
@Component({
  selector: 'page-dispositivos',
  templateUrl: 'dispositivos.html',
})
export class DispositivosPage {

  dispositivosConocidos : Dispositivo[];
  dispositivos : Dispositivo[];
  usuario : Usuario;
  callback;
  dispositivosRef: Subscription;

  dispositivos$: Observable<Dispositivo[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _bleService: BleServiceProvider
  ) {    
    this.dispositivos = [];
  }

      /**/

  ionViewDidLoad() {    
    this.usuario = this.navParams.get('usuario');
    this.callback = this.navParams.get('callback');
/*
    this.dispositivosRef = this._bleService.dispositivosSalida$.subscribe(response => {
      console.log(response);
      this.dispositivos = response;
    })*/

    // this.dispositivos$ = this._bleService.getClientes$();
    // this.dispositivos$.subscribe(dispositivos => this.dispositivos = dispositivos);
    this.dispositivosRef = this._bleService.dispositivosSalida$.subscribe(response => {
      // debugger;
      this.dispositivos = response;
    });
    
         

    /* Buscamos dispositivos guardados anteriormente.
      puede que tengamos que diferenciar los que están asignados de los que no y mostrar algo distinto (color o icono) 
      y la posibilidad de quitar asignacion anterior y asignar a otro usuario, igual se puede mostrar el color en rojo
      si está en uso y gris si no y meter botón de olvidar
    */

    // buscar los dispositivos guardados anteriormente
    // simulamos esta busqueda en nuestra base de datos (no se si necesitaremos indicador de asignado)
    this.dispositivosConocidos = [ new Dispositivo ('ID11', '000000011', 'Dispositivo 11', 'Dispositivo conocido 11', false, 0)];
    this.dispositivosConocidos.push( new Dispositivo('ID12', '000000012', 'Dispositivo 12', 'Dispositivo conocido 12', false, 0) );
        
  }

  hola() {
    // console.log('Estamos en  bussdafdsfcar', this._bleService.dispositivosSalida);
    // this.dispositivos = this._bleService.dispositivosSalida;
    console.log(this.dispositivos);
  }

  buscar() {    
    this._bleService.scan();        
  }

  registrar(dispositivo: Dispositivo) { debugger;
    this.usuario.id_dispositivo = dispositivo.uuid;
    // hacemos uso de callback para pasar el usuario modificado con el id del dispositivo   
    this.callback(this.usuario).then(()=>{      
      this.navCtrl.pop();
    });
    
  }

 

}
