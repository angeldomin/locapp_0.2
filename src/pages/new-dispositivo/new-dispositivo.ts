import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dispositivo } from '../../models/dispositivo'
import { Usuario } from '../../models/usuario';
import { Subscription } from 'rxjs/Subscription';
import { BleServiceProvider } from '../../providers/ble-service/ble-service';

/**
 * Generated class for the NewDispositivoPage page.
 *
 * Aquí la búsqueda de dispositivos y asignación a un usuario.
 */

@IonicPage()
@Component({
  selector: 'page-new-dispositivo',
  templateUrl: 'new-dispositivo.html',
})
export class NewDispositivoPage {

  dispositivosConocidos : Dispositivo[];
  dispositivos : Dispositivo[];
  usuario : Usuario;
  callback;
  dispositivosRef: Subscription;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _bleService: BleServiceProvider
  ) {    
    
  }

  ionViewDidLoad() {    
    this.usuario = this.navParams.get('usuario');
    this.callback = this.navParams.get('callback');

    /* Buscamos dispositivos guardados anteriormente.
      puede que tengamos que diferenciar los que están asignados de los que no y mostrar algo distinto (color o icono) 
      y la posibilidad de quitar asignacion anterior y asignar a otro usuario, igual se puede mostrar el color en rojo
      si está en uso y gris si no y meter botón de olvidar
    */

    // buscar los dispositivos guardados anteriormente
    // simulamos esta busqueda en nuestra base de datos (no se si necesitaremos indicador de asignado)
    this.dispositivosConocidos = [ new Dispositivo ('ID11', '000000011', 'Dispositivo 11', 'Dispositivo conocido 11')];
    this.dispositivosConocidos.push( new Dispositivo('ID12', '000000012', 'Dispositivo 12', 'Dispositivo conocido 12') );
        
  }

  buscar() {
    // simulado
    this.dispositivos = [ new Dispositivo ('ID01', '000000000', 'Dispositivo 0', 'Dispositivo simulado 0')];
    this.dispositivos.push( new Dispositivo('ID02', '000000001', 'Dispositivo 1', 'Dispositivo simulado 1') );
    this.dispositivos.push( new Dispositivo('ID03', '000000002', 'Dispositivo 2', 'Dispositivo simulado 2') );
    this.dispositivos.push( new Dispositivo('ID04', '000000003', 'Dispositivo 3', 'Dispositivo simulado 3') );
    // verdadero 

    // nos suscribimos a observable de dispositivos, la lista de dispositivos que encuentra
    this.dispositivosRef = this._bleService.dispositivosSalida$.subscribe(response => {
      this.dispositivos = response;
    })
    
    this._bleService.scan();

    
  }

  registrar(dispositivo: Dispositivo) {
    this.usuario.id_dispositivo = dispositivo._id;
    // hacemos uso de callback para pasar el usuario modificado con el id del dispositivo   
    this.callback(this.usuario).then(()=>{      
      this.navCtrl.pop();
    });
    
  }

 

}
