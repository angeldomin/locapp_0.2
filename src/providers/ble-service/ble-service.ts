import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble';
import { Dispositivo } from '../../models/dispositivo';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ParUsuarioRSSI } from '../../models/par-usuario-rssi';
import { Grupo } from '../../models/grupo';

@Injectable() 
export class BleServiceProvider {

    public paresRSSI: ParUsuarioRSSI[];
    public dispositivos : Dispositivo[];

    // public dispositivosSalida$: Observable<any[]>; // observable para recuperar los dispositivos que encontramos al escanear
    // public dispositivosSalida: Dispositivo[];
    // public dispositivosSalida$ = new Subject<Dispositivo[]>();
    public dispositivosSalida = new Subject<any>();
    public dispositivosSalida$ = this.dispositivosSalida.asObservable();

    // public paresUsuarioRSSI: ParUsuarioRSSI[]; 
    // public paresUsuarioRSSISalida$ = new Subject<ParUsuarioRSSI[]>();
    // Observable como lo hago en el curro
    private paresUsuarioRSSI = new Subject<any>();
    public paresUsuarioRSSISalida$ = this.paresUsuarioRSSI.asObservable();

  constructor(
    public http: HttpClient,
    private _ble: BLE,
    private toastCtrl: ToastController 
  ) {
    // this.dispositivosSalida = [];
    this.dispositivos = [];
    // this.paresUsuarioRSSI = [];
    this.paresRSSI = [];
  }  

  scan() {
    console.log('escaneando'); 
    this.dispositivos = [];
    this._ble.scan([], 10).subscribe(response => {
        console.log(response);      
        this.dispositivos.push(new Dispositivo('', response.id, response.name, '', false, 0));
        this.dispositivosSalida.next(this.dispositivos);  
        console.log(this.dispositivos);  
    });
  }

  conectar(uuid) {

    this._ble.isConnected(uuid).then( 
        () => { 
            console.log('connected');
            this._ble.disconnect(uuid); console.log('xx Nos desconectamos del dispositivo ', uuid);
            let toast = this.toastCtrl.create({
                message: 'The peripheral disconnected',
                duration: 3000,
                position: 'middle'
              }); 
            toast.present();
        }, 
        () => {   
            console.log('not connected');
            this._ble.connect(uuid).subscribe( 
                peripheralData => {
                    console.log(peripheralData);                   
                    let leyendo = false;
                    setInterval(()=>{
                        if (!leyendo) {
                            leyendo = true;
                            this._ble.readRSSI(uuid).then(
                                rssi => {
                                    console.log(uuid+' RSSI -> ', rssi);
                                    leyendo = false;
                                }, error => {
                                    console.log(error); 
                                    leyendo = false;        
                                });
                        }                    
                    }, 1000);                    
                }, peripheralData => { 
                    console.log('disconnected'); 
                });
        } 
    );      
  }

  multiconect(grupo: Grupo) {

    grupo.usuarios.forEach(usuario => {
        this.paresRSSI.push(new ParUsuarioRSSI(usuario.nombre, usuario.id_dispositivo, 0, 0, 0, false, false, {lower:0, upper:0}));
    });

    this.paresRSSI.forEach(par => {
        this._ble.connect(par.uuid).subscribe(
            peripheralData => {                 
                setInterval(()=>{ this._ble.readRSSI(par.uuid).then(
                    rssi => {
                        console.log(par.usuario, ' --- RSSI -> ', rssi);
                        par.rssi = rssi;
                        this.paresUsuarioRSSI.next(this.paresRSSI);
                    }, error => {
                        console.log(error);                        
                    });
                
                }, 1000);
            }, peripheralData => {
                console.log('disconnected'); 
            });
    });    
  }

  multidisconect(grupo: Grupo) {
    grupo.usuarios.forEach(usuario => {
        this._ble.disconnect(usuario.id_dispositivo);
    });
    this.paresRSSI = [];
  }
 
}



/* información de: https://ionicframework.com/docs/native/ble/
Peripheral Data

Peripheral Data is passed to the success callback when scanning and connecting. Limited data is passed when scanning.

{
    'name': 'Battery Demo',
    'id': '20:FF:D0:FF:D1:C0',
    'advertising': [2,1,6,3,3,15,24,8,9,66,97,116,116,101,114,121],
    'rssi': -55
}

After connecting, the peripheral object also includes service, characteristic and descriptor information.

{
    'name': 'Battery Demo',
    'id': '20:FF:D0:FF:D1:C0',
    'advertising': [2,1,6,3,3,15,24,8,9,66,97,116,116,101,114,121],
    'rssi': -55,
    'services': [
        '1800',
        '1801',
        '180f'
    ],
    'characteristics': [
        {
            'service': '1800',
            'characteristic': '2a00',
            'properties': [
                'Read'
            ]
        },
        {
            'service': '1800',
            'characteristic': '2a01',
            'properties': [
                'Read'
            ]
        },
        {
            'service': '1801',
            'characteristic': '2a05',
            'properties': [
                'Read'
            ]
        },
        {
            'service': '180f',
            'characteristic': '2a19',
            'properties': [
                'Read'
            ],
            'descriptors': [
                {
                    'uuid': '2901'
                },
                {
                    'uuid': '2904'
                }
            ]
        }
    ]
}

Advertising Data

Bluetooth advertising data is returned in when scanning for devices. The format varies depending on your platform. On Android advertising data will be the raw advertising bytes. iOS does not allow access to raw advertising data, so a dictionary of data is returned.

The advertising information for both Android and iOS appears to be a combination of advertising data and scan response data.
Android

 {
     'name': 'demo',
     'id': '00:1A:7D:DA:71:13',
     'advertising': ArrayBuffer,
    'rssi': -37
}

Convert the advertising info to a Uint8Array for processing. var adData = new Uint8Array(peripheral.advertising)
iOS

Note that iOS uses the string value of the constants for the Advertisement Data Retrieval Keys. This will likely change in the future.

{
    'name': 'demo',
    'id': 'D8479A4F-7517-BCD3-91B5-3302B2F81802',
    'advertising': {
        'kCBAdvDataChannel': 37,
        'kCBAdvDataServiceData': {
            'FED8': {
                'byteLength': 7 // data not shown
            }
        },
        'kCBAdvDataLocalName': 'demo',
        'kCBAdvDataServiceUUIDs': ['FED8'],
        'kCBAdvDataManufacturerData': {
            'byteLength': 7  // data not shown
        },
        'kCBAdvDataTxPowerLevel': 32,
        'kCBAdvDataIsConnectable': true
    },
    'rssi': -53
}

Typed Arrays

This plugin uses typed Arrays or ArrayBuffers for sending and receiving data.

This means that you need convert your data to ArrayBuffers before sending and from ArrayBuffers when receiving.

// ASCII only
function stringToBytes(string) {
   var array = new Uint8Array(string.length);
   for (var i = 0, l = string.length; i < l; i++) {
       array[i] = string.charCodeAt(i);
    }
    return array.buffer;
}

// ASCII only
function bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

You can read more about typed arrays in these articles on MDN and HTML5 Rocks.
UUIDs

UUIDs are always strings and not numbers. Some 16-bit UUIDs, such as '2220' look like integers, but they're not. (The integer 2220 is 0x8AC in hex.) This isn't a problem with 128 bit UUIDs since they look like strings 82b9e6e1-593a-456f-be9b-9215160ebcac. All 16-bit UUIDs should also be passed to methods as strings.
Instance Members
scan(services, seconds)

Scan and discover BLE peripherals for the specified amount of time.
Param 	Type 	Details
services 	string[] 	

List of service UUIDs to discover, or [] to find all devices
seconds 	number 	

Number of seconds to run discovery

Returns: Observable<any> Returns an Observable that notifies of each peripheral that is discovered during the specified time.
startScan(services)

Scan and discover BLE peripherals until stopScan is called.
Param 	Type 	Details
services 	string[] 	

List of service UUIDs to discover, or [] to find all devices

Returns: Observable<any> Returns an Observable that notifies of each peripheral discovered.
startScanWithOptions(services, options)

Scans for BLE devices. This function operates similarly to the startScan function, but allows you to specify extra options (like allowing duplicate device reports).
Param 	Type 	Details
services 	string[] 	

List of service UUIDs to discover, or [] to find all devices
options 	any 	

Returns: Observable<any> Returns an Observable that notifies of each peripheral discovered.
stopScan()

Stop a scan started by startScan.

Returns: returns a Promise.
connect(deviceId)

Connect to a peripheral.
Param 	Type 	Details
deviceId 	string 	

UUID or MAC address of the peripheral

Returns: Returns an Observable that notifies of connect/disconnect.
disconnect(deviceId)

Disconnect from a peripheral.
Param 	Type 	Details
deviceId 	string 	

UUID or MAC address of the peripheral

Returns: Returns a Promise
read(deviceId, serviceUUID, characteristicUUID)

Read the value of a characteristic.
Param 	Type 	Details
deviceId 	string 	

UUID or MAC address of the peripheral
serviceUUID 	string 	

UUID of the BLE service
characteristicUUID 	string 	

UUID of the BLE characteristic

Returns: Returns a Promise
write(deviceId, serviceUUID, characteristicUUID, value)

Write the value of a characteristic.
Param 	Type 	Details
deviceId 	string 	

UUID or MAC address of the peripheral
serviceUUID 	string 	

UUID of the BLE service
characteristicUUID 	string 	

UUID of the BLE characteristic
value 	ArrayBuffer 	

Data to write to the characteristic, as an ArrayBuffer.

Returns: Returns a Promise
writeWithoutResponse(deviceId, serviceUUID, characteristicUUID, value)

Write the value of a characteristic without waiting for confirmation from the peripheral.
Param 	Type 	Details
deviceId 	string 	

UUID or MAC address of the peripheral
serviceUUID 	string 	

UUID of the BLE service
characteristicUUID 	string 	

UUID of the BLE characteristic
value 	ArrayBuffer 	

Data to write to the characteristic, as an ArrayBuffer.

Returns: Returns a Promise
startNotification(deviceId, serviceUUID, characteristicUUID)

Register to be notified when the value of a characteristic changes.
Param 	Type 	Details
deviceId 	string 	

UUID or MAC address of the peripheral
serviceUUID 	string 	

UUID of the BLE service
characteristicUUID 	string 	

UUID of the BLE characteristic

Returns: Returns an Observable that notifies of characteristic changes.
stopNotification(deviceId, serviceUUID, characteristicUUID)

Stop being notified when the value of a characteristic changes.
Param 	Type 	Details
deviceId 	string 	

UUID or MAC address of the peripheral
serviceUUID 	string 	

UUID of the BLE service
characteristicUUID 	string 	

UUID of the BLE characteristic

Returns: Promise<any>
isConnected(deviceId)

Report the connection status.
Param 	Type 	Details
deviceId 	string 	

UUID or MAC address of the peripheral

Returns: Promise<any>
isEnabled()

Report if bluetooth is enabled.

Returns: Promise<void> Returns a Promise that resolves if Bluetooth is enabled, and rejects if disabled.
startStateNotifications()

Register to be notified when Bluetooth state changes on the device.

Returns: Returns an Observable that notifies when the Bluetooth is enabled or disabled on the device.
stopStateNotifications()

Stop state notifications.

Returns: Promise<any>
showBluetoothSettings()

Open System Bluetooth settings (Android only).

Returns: Promise<any>
enable()

Enable Bluetooth on the device (Android only).

Returns: Promise<any>
readRSSI(deviceId)

Read the RSSI value on the device connection.
Param 	Type 	Details
deviceId 	string 	

UUID or MAC address of the peripheral

Returns: Promise<any>
BLEScanOptions
Param 	Type 	Details
reportDuplicates 	boolean 	

true if duplicate devices should be reported, false (default) if devices should only be reported once.
(optional)
*/