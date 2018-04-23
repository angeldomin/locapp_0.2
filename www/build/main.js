webpackJsonp([3],{

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = /** @class */ (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\proyectos\locapp_0.2\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>Locapp</h3>\n\n  <p>\n    Aplicación que avisa si un niño se aleja y te ayuda a localizarlo.\n  </p>\n\n  <button ion-button secondary menuToggle>Menú</button>\n</ion-content>\n'/*ion-inline-end:"C:\proyectos\locapp_0.2\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_firebase__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(258);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Este service se encargará de las operaciones con la base de datos firebase.
*/
var FirebaseServiceProvider = /** @class */ (function () {
    function FirebaseServiceProvider(http, _firebase, dataBase) {
        this.http = http;
        this._firebase = _firebase;
        this.dataBase = dataBase;
        console.log('Hello FirebaseServiceProvider Provider');
        __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().signInAnonymously().catch(function (error) {
            // Handle Errors here.
            // var errorCode = error.code;
            var errorMessage = error.message;
            console.log('error en signInAnonymously', errorMessage);
        });
        __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().onAuthStateChanged(function (user) {
            console.log('Cambio en auth');
            if (user) {
                // User is signed in.
                // var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                console.log(' :O ', uid);
                /* var userRef = app.dataInfo.child(app.users);
            
                var useridRef = userRef.child(app.userid);
            
                useridRef.set({
                  locations: "",
                  theme: "",
                  colorScheme: "",
                  food: ""
                });*/
            }
            else {
                // User is signed out.
                // ...
            }
            // ...
        });
        this.usuariosRef = this.dataBase.list('/usuarios/');
        this.usuariosSalida$ = this.usuariosRef.snapshotChanges().map(function (changes) {
            return changes.map(function (c) { return (__assign({ key: c.payload.key }, c.payload.val())); });
        });
    }
    FirebaseServiceProvider.prototype.newUsuario = function (usuario) {
        var usuariosRef = __WEBPACK_IMPORTED_MODULE_2_firebase__["database"]().ref('/usuarios/');
        var _id = usuario._id;
        var nombre = usuario.nombre;
        var apellido1 = usuario.apellido1;
        var apellido2 = usuario.apellido2;
        var edad = usuario.edad;
        var imagen = usuario.image;
        var id_dispositivo = usuario.id_dispositivo;
        console.log('Probando a añadir nuevo usuario');
        /*usuariosRef.set({
          _id,
          nombre,
          apellido1,
          apellido2,
          edad,
          imagen,
          id_dispositivo
        });*/
        // mirar aquí https://firebase.google.com/docs/database/admin/save-data
        // este funciona y en newPostRef guardamos la referencia unica al objeto que guardamos
        var newPostRef = usuariosRef.push({
            _id: _id,
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2,
            edad: edad,
            imagen: imagen,
            id_dispositivo: id_dispositivo
        });
        var postId = newPostRef.key; // obtenemos el id único
        // TODO TAJO usuariosRef.child("postId").set(_id: postId);
        // console.log(this._firebase.getValue('usuarios', '4ltcRquTh4zI0XbhkMOE'));
        // console.log(usuariosRef);
        console.log('provider firebase');
    };
    FirebaseServiceProvider.prototype.editUsuario = function (usuario) {
        // mirar a ver si se hace con set
    };
    FirebaseServiceProvider.prototype.deleteUsuario = function (usuario) {
        // mirar removeValue() o setValue() null
        var usuariosRef = __WEBPACK_IMPORTED_MODULE_2_firebase__["database"]().ref('/usuarios/');
        var userRef = usuariosRef.child(usuario);
    };
    FirebaseServiceProvider.prototype.getUsuario = function () {
        // const usuariosRef: firebase.database.Reference = firebase.database().ref('/usuarios/');
        // console.log(usuariosRef.toJSON);
    };
    FirebaseServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_firebase__["a" /* Firebase */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], FirebaseServiceProvider);
    return FirebaseServiceProvider;
}());

//# sourceMappingURL=firebase-service.js.map

/***/ }),

/***/ 167:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 167;

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/buscador/buscador.module": [
		508,
		2
	],
	"../pages/new-dispositivo/new-dispositivo.module": [
		509,
		1
	],
	"../pages/usuario/usuario.module": [
		510,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 207;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Usuario; });
var Usuario = /** @class */ (function () {
    function Usuario(_id, nombre, apellido1, apellido2, edad, image, id_dispositivo) {
        this._id = _id;
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.edad = edad;
        this.image = image;
        this.id_dispositivo = id_dispositivo;
    }
    return Usuario;
}());

//# sourceMappingURL=usuario.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BleServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__ = __webpack_require__(212);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the BleServiceProvider provider.

  Servicio que se encargará de lo relacionado con bluetooth
*/
var BleServiceProvider = /** @class */ (function () {
    function BleServiceProvider(http, _ble) {
        this.http = http;
        this._ble = _ble;
        this.dummyData = {
            json: function () {
                return [{
                        name: 'Battery Demo',
                        id: '20:FF:D0:FF:D1:C0',
                        advertising: [2, 1, 6, 3, 3, 15, 24, 8, 9, 66, 97, 116, 116, 101, 114, 121],
                        rssi: -55
                    }, {
                        name: 'Battery Demo',
                        id: '20:FF:D0:FF:D1:C0',
                        advertising: [2, 1, 6, 3, 3, 15, 24, 8, 9, 66, 97, 116, 116, 101, 114, 121],
                        rssi: -55
                    }
                ];
            }
        };
        console.log('Hello BleServiceProvider Provider');
        /*
        this.dispositivosSalida$ = [ {
            name: 'Battery Demo',
            id: '20:FF:D0:FF:D1:C0',
            advertising: [2,1,6,3,3,15,24,8,9,66,97,116,116,101,114,121],
            rssi: -55
        }, {
            name: 'Battery Demo',
            id: '20:FF:D0:FF:D1:C0',
            advertising: [2,1,6,3,3,15,24,8,9,66,97,116,116,101,114,121],
            rssi: -55 }
        ];*/
        this.dispositivosSalida$ = null;
    }
    BleServiceProvider.prototype.scan = function () {
        var _this = this;
        this._ble.scan([], 5).subscribe(function (response) {
            _this.dispositivosSalida$ = response;
        });
    };
    BleServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__["a" /* BLE */]])
    ], BleServiceProvider);
    return BleServiceProvider;
}());

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
//# sourceMappingURL=ble-service.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buscador_buscador__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_firebase_service_firebase_service__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__usuario_usuario__ = __webpack_require__(88);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams, _firebaseService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._firebaseService = _firebaseService;
        // traemos de base de datos la lista de usuarios registrados
        // nos suscribimos a observable de usuarios, la lista de usuarios guardados en base de datos
        this.usuariosRef = this._firebaseService.usuariosSalida$.subscribe(function (response) {
            _this.usuarios = response;
        });
    }
    ListPage.prototype.seleccionar = function (usuario) {
        this.selectedUser = usuario;
    };
    ListPage.prototype.buscar = function (usuario) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__buscador_buscador__["a" /* BuscadorPage */], { usuario: usuario, mode: 'edit' });
    };
    ListPage.prototype.nuevoUsuario = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__usuario_usuario__["a" /* UsuarioPage */], {});
    };
    ListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"C:\proyectos\locapp_0.2\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Lista de usuarios</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content> \n  <ion-list>\n    <button ion-item *ngFor="let usuario of usuarios" (click)="seleccionar(usuario)">\n      {{usuario.nombre}} {{usuario.apellido1}}      \n    </button>\n  </ion-list>\n  <div padding>\n    <button ion-button block (click)="nuevoUsuario()">\n      Nuevo usuario\n    </button>\n  </div>  \n  <div *ngIf="selectedUser" padding>\n    Has seleccionado el usuario <b>{{selectedUser.nombre}}</b>\n    <button ion-button (click)="buscar(selectedUser)">\n      Iniciar búsqueda\n    </button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\proyectos\locapp_0.2\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */]])
    ], ListPage);
    return ListPage;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(334);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_list_list__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_firebase__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_ble__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_buscador_buscador__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_new_dispositivo_new_dispositivo__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_usuario_usuario__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_firebase_service_firebase_service__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2_database__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_firebase_app__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_ble_service_ble_service__ = __webpack_require__(209);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















// firebase imports





// configuracion de la base de datos proporcionada por mi firebase
var firebaseConfig = {
    apiKey: "AIzaSyDUv_kWR7GzdL0UE7UrErbKzH1yIxiDDc8",
    authDomain: "locapp-2fc27.firebaseapp.com",
    databaseURL: "https://locapp-2fc27.firebaseio.com",
    projectId: "locapp-2fc27",
    storageBucket: "locapp-2fc27.appspot.com",
    messagingSenderId: "235986032077"
};
__WEBPACK_IMPORTED_MODULE_18_firebase_app__["initializeApp"](firebaseConfig);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_buscador_buscador__["a" /* BuscadorPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_new_dispositivo_new_dispositivo__["a" /* NewDispositivoPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_usuario_usuario__["a" /* UsuarioPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_16_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/buscador/buscador.module#BuscadorPageModule', name: 'BuscadorPage', segment: 'buscador', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/new-dispositivo/new-dispositivo.module#NewDispositivoPageModule', name: 'NewDispositivoPage', segment: 'new-dispositivo', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/usuario/usuario.module#UsuarioPageModule', name: 'UsuarioPage', segment: 'usuario', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_17_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_buscador_buscador__["a" /* BuscadorPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_new_dispositivo_new_dispositivo__["a" /* NewDispositivoPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_usuario_usuario__["a" /* UsuarioPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_firebase__["a" /* Firebase */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_15__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_ble__["a" /* BLE */],
                __WEBPACK_IMPORTED_MODULE_19__providers_ble_service_ble_service__["a" /* BleServiceProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dispositivo; });
var Dispositivo = /** @class */ (function () {
    function Dispositivo(_id, uuid, nombre_dispositivo, descripcion) {
        this._id = _id;
        this.uuid = uuid;
        this.nombre_dispositivo = nombre_dispositivo;
        this.descripcion = descripcion;
    }
    return Dispositivo;
}());

//# sourceMappingURL=dispositivo.js.map

/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_buscador_buscador__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_new_dispositivo_new_dispositivo__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_usuario_usuario__ = __webpack_require__(88);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        this.pages = [
            { title: 'Inicio', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Nuevo Usuario', component: __WEBPACK_IMPORTED_MODULE_8__pages_usuario_usuario__["a" /* UsuarioPage */] },
            { title: 'Usuarios', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] },
            { title: 'Dispositivos', component: __WEBPACK_IMPORTED_MODULE_7__pages_new_dispositivo_new_dispositivo__["a" /* NewDispositivoPage */] },
            { title: 'Buscador', component: __WEBPACK_IMPORTED_MODULE_6__pages_buscador_buscador__["a" /* BuscadorPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\proyectos\locapp_0.2\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\proyectos\locapp_0.2\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuscadorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_usuario__ = __webpack_require__(208);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the BuscadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BuscadorPage = /** @class */ (function () {
    function BuscadorPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.NUMERO_DE_ARCOS = 6;
        if (navParams.get('usuario')) {
            this.usuario = navParams.get('usuario');
        }
        else {
            this.usuario = new __WEBPACK_IMPORTED_MODULE_2__models_usuario__["a" /* Usuario */]('', '', '', '', 0, '', '');
        }
        if (navParams.get('mode')) {
            this.modo = navParams.get('mode');
        }
        else {
            this.modo = '';
        }
        console.log('Usuario: ', this.usuario);
        console.log('Modo: ', this.modo);
    }
    BuscadorPage.prototype.ionViewDidLoad = function () {
        this._CANVAS = this.canvasEl.nativeElement;
        this._CANVAS.width = 250;
        this._CANVAS.height = 250;
        this.initialiseCanvas();
    };
    BuscadorPage.prototype.initialiseCanvas = function () {
        if (this._CANVAS.getContext) {
            this.setupCanvas();
        }
    };
    BuscadorPage.prototype.setupCanvas = function () {
        this._CONTEXT = this._CANVAS.getContext('2d');
        this._CONTEXT.fillStyle = "#6b9b83";
        this._CONTEXT.fillRect(0, 0, 500, 500);
    };
    BuscadorPage.prototype.clearCanvas = function () {
        this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
        this.setupCanvas();
    };
    BuscadorPage.prototype.drawCircle = function () {
        this.clearCanvas();
        this._CONTEXT.beginPath();
        // x, y, radius, startAngle, endAngle
        this._CONTEXT.arc(this._CANVAS.width / 2, this._CANVAS.height / 2, 120, 0, 2 * Math.PI);
        this._CONTEXT.arc(this._CANVAS.width / 2, this._CANVAS.height / 2, 100, 0, 2 * Math.PI);
        this._CONTEXT.arc(this._CANVAS.width / 2, this._CANVAS.height / 2, 80, 0, 2 * Math.PI);
        this._CONTEXT.lineWidth = 1;
        this._CONTEXT.strokeStyle = '#ffffff';
        this._CONTEXT.stroke();
        this._CONTEXT.closePath();
        this._CONTEXT.beginPath();
        this._CONTEXT.arc(this._CANVAS.width / 2, this._CANVAS.height / 2, 60, 0, 2 * Math.PI);
        this._CONTEXT.lineWidth = 2;
        this._CONTEXT.strokeStyle = '#c82124';
        this._CONTEXT.stroke();
        this._CONTEXT.closePath();
        this._CONTEXT.beginPath();
        this._CONTEXT.arc(this._CANVAS.width / 2, this._CANVAS.height / 2, 40, 0, 2 * Math.PI);
        this._CONTEXT.arc(this._CANVAS.width / 2, this._CANVAS.height / 2, 20, 0, 2 * Math.PI);
        this._CONTEXT.lineWidth = 1;
        this._CONTEXT.strokeStyle = '#ffffff';
        this._CONTEXT.stroke();
        this._CONTEXT.closePath();
    };
    // le pasaremos un número que puede ser directamente el valor de la potencia de la señal
    // y a partir de eso calculará el círculo a pintar en rojo y el resto en gris
    BuscadorPage.prototype.drawRadar = function (senial) {
        var radio_max = 120; // seteo el radio exterior
        var radio = radio_max;
        var arco_actual = this.NUMERO_DE_ARCOS;
        // distancia tendrá el arco que corresponde para esa señal
        var distancia = Math.round(senial / (radio / this.NUMERO_DE_ARCOS)); //radio es el arco mas grande posible
        this.clearCanvas();
        // dibujamos los arcos
        for (var i = 0; i < this.NUMERO_DE_ARCOS; i++) {
            console.log('Distancia =', distancia);
            console.log('Arco actual =', arco_actual);
            this._CONTEXT.beginPath();
            if (distancia === arco_actual) {
                this._CONTEXT.arc(this._CANVAS.width / 2, this._CANVAS.height / 2, radio, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle 
                this._CONTEXT.lineWidth = 5;
                this._CONTEXT.strokeStyle = '#c82124';
            }
            else {
                this._CONTEXT.arc(this._CANVAS.width / 2, this._CANVAS.height / 2, radio, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle 
                this._CONTEXT.lineWidth = 1;
                this._CONTEXT.strokeStyle = '#ffffff';
            }
            this._CONTEXT.stroke();
            this._CONTEXT.closePath();
            radio = radio - (radio_max / this.NUMERO_DE_ARCOS);
            arco_actual--;
        }
        // o bien metemos aquí la lógica de señalar si vamos en buena dirección o la pasamos a otro sitio
        this._CONTEXT.beginPath();
        this._CONTEXT.moveTo(this._CANVAS.width / 2, this._CANVAS.height / 2);
        this._CONTEXT.lineTo(this._CANVAS.width / 2, 5);
        this._CONTEXT.lineTo(this._CANVAS.width / 2 - 30, 60);
        this._CONTEXT.moveTo(this._CANVAS.width / 2 + 30, 60);
        this._CONTEXT.lineTo(this._CANVAS.width / 2, 5);
        //this._CONTEXT.lineJoin = 'miter'; // para terminar en punta pero no le hago funcionar :(
        this._CONTEXT.lineCap = "round";
        this._CONTEXT.lineWidth = 15;
        this._CONTEXT.strokeStyle = '#c82124';
        this._CONTEXT.stroke();
        this._CONTEXT.closePath();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('canvas'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], BuscadorPage.prototype, "canvasEl", void 0);
    BuscadorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-buscador',template:/*ion-inline-start:"C:\proyectos\locapp_0.2\src\pages\buscador\buscador.html"*/'\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Buscador</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <ion-card>\n      <ion-card-header>\n        {{usuario.nombre}} {{usuario.apellido}}\n      </ion-card-header>\n      <ion-card-content>        \n        Datos relacionados con el usuario enlazado a este dispositivo.\n      </ion-card-content>\n    </ion-card>\n    <div class="ion-canvas">\n      <canvas class="canvascentrado" #canvas></canvas>\n    </div>\n    <button\n      ion-button\n      color="primary"\n      (click)="drawCircle()">\n      Draw circles\n   </button>\n   <button\n      ion-button\n      color="primary"\n      (click)="drawRadar(50)">\n      Draw a Radar\n   </button>\n   \n\n</ion-content>\n'/*ion-inline-end:"C:\proyectos\locapp_0.2\src\pages\buscador\buscador.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], BuscadorPage);
    return BuscadorPage;
}());

//# sourceMappingURL=buscador.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewDispositivoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_dispositivo__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_ble_service_ble_service__ = __webpack_require__(209);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the NewDispositivoPage page.
 *
 * Aquí la búsqueda de dispositivos y asignación a un usuario.
 */
var NewDispositivoPage = /** @class */ (function () {
    function NewDispositivoPage(navCtrl, navParams, _bleService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._bleService = _bleService;
    }
    NewDispositivoPage.prototype.ionViewDidLoad = function () {
        this.usuario = this.navParams.get('usuario');
        this.callback = this.navParams.get('callback');
        /* Buscamos dispositivos guardados anteriormente.
          puede que tengamos que diferenciar los que están asignados de los que no y mostrar algo distinto (color o icono)
          y la posibilidad de quitar asignacion anterior y asignar a otro usuario, igual se puede mostrar el color en rojo
          si está en uso y gris si no y meter botón de olvidar
        */
        // buscar los dispositivos guardados anteriormente
        // simulamos esta busqueda en nuestra base de datos (no se si necesitaremos indicador de asignado)
        this.dispositivosConocidos = [new __WEBPACK_IMPORTED_MODULE_2__models_dispositivo__["a" /* Dispositivo */]('ID11', '000000011', 'Dispositivo 11', 'Dispositivo conocido 11')];
        this.dispositivosConocidos.push(new __WEBPACK_IMPORTED_MODULE_2__models_dispositivo__["a" /* Dispositivo */]('ID12', '000000012', 'Dispositivo 12', 'Dispositivo conocido 12'));
    };
    NewDispositivoPage.prototype.buscar = function () {
        var _this = this;
        // simulado
        this.dispositivos = [new __WEBPACK_IMPORTED_MODULE_2__models_dispositivo__["a" /* Dispositivo */]('ID01', '000000000', 'Dispositivo 0', 'Dispositivo simulado 0')];
        this.dispositivos.push(new __WEBPACK_IMPORTED_MODULE_2__models_dispositivo__["a" /* Dispositivo */]('ID02', '000000001', 'Dispositivo 1', 'Dispositivo simulado 1'));
        this.dispositivos.push(new __WEBPACK_IMPORTED_MODULE_2__models_dispositivo__["a" /* Dispositivo */]('ID03', '000000002', 'Dispositivo 2', 'Dispositivo simulado 2'));
        this.dispositivos.push(new __WEBPACK_IMPORTED_MODULE_2__models_dispositivo__["a" /* Dispositivo */]('ID04', '000000003', 'Dispositivo 3', 'Dispositivo simulado 3'));
        // verdadero 
        // nos suscribimos a observable de dispositivos, la lista de dispositivos que encuentra
        this.dispositivosRef = this._bleService.dispositivosSalida$.subscribe(function (response) {
            _this.dispositivos = response;
        });
        this._bleService.scan();
    };
    NewDispositivoPage.prototype.registrar = function (dispositivo) {
        var _this = this;
        this.usuario.id_dispositivo = dispositivo._id;
        // hacemos uso de callback para pasar el usuario modificado con el id del dispositivo   
        this.callback(this.usuario).then(function () {
            _this.navCtrl.pop();
        });
    };
    NewDispositivoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-new-dispositivo',template:/*ion-inline-start:"C:\proyectos\locapp_0.2\src\pages\new-dispositivo\new-dispositivo.html"*/'<!--\n  Html correspondiente a la pantalla de registrar nuevo dispositivo\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Dispositivos Bluetooth</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>  \n  <div> <!-- dispositivos registrados anteriormente -->\n    <ion-label>Dispositivos conocidos:</ion-label>\n    <ion-list>\n        <button ion-item *ngFor="let dispositivo of dispositivosConocidos" (click)="registrar(dispositivo)">      \n          {{dispositivo.nombre_dispositivo}} {{dispositivo.descripcion}}      \n        </button>\n    </ion-list>\n  </div>\n  <br><br>\n  <button ion-button (click)="buscar()">Buscar dispositivos Bluetooth</button>\n  <ion-list>\n    <button ion-item *ngFor="let dispositivo of dispositivos" (click)="registrar(dispositivo)">      \n      {{dispositivo.nombre_dispositivo}} {{dispositivo.descripcion}}      \n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\proyectos\locapp_0.2\src\pages\new-dispositivo\new-dispositivo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_ble_service_ble_service__["a" /* BleServiceProvider */]])
    ], NewDispositivoPage);
    return NewDispositivoPage;
}());

//# sourceMappingURL=new-dispositivo.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuarioPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new_dispositivo_new_dispositivo__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_usuario__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_firebase_service_firebase_service__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_alert_alert_controller__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the UsuarioPage page.
 *
 * Página para dar de alta nuevos usuarios y modificar existentes
 * Aquí relacionaremos un usuario con un dispositivo concreto
 *
 */
var UsuarioPage = /** @class */ (function () {
    function UsuarioPage(navCtrl, navParams, _firebaseService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._firebaseService = _firebaseService;
        this.alertCtrl = alertCtrl;
        this.myCallbackFunction = function (_params) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.usuario = _params;
                resolve();
            });
        };
        // si estamos en modo new inicializamos el usuario
        this.usuario = new __WEBPACK_IMPORTED_MODULE_3__models_usuario__["a" /* Usuario */]('', '', '', '', 0, '', '');
        // si es edit los datos del usuario los tendremos, o bien pasados directamente o a partir por ejemplo del id buscar el resto de base de datos
    }
    UsuarioPage.prototype.ionViewDidLoad = function () {
    };
    UsuarioPage.prototype.newUser = function (usuario) {
        // conectamos con base de datos y damos de alta un nuevo usuario
        this._firebaseService.newUsuario(usuario);
    };
    UsuarioPage.prototype.editUser = function () {
        // editamos los datos de un usuario existente 
    };
    // Función que abre la ventana de busqueda de dispositivos
    UsuarioPage.prototype.asignarDispositivo = function () {
        this.usuario.id_dispositivo = ''; // si ya tenía uno asignado se lo quitamos
        // navegamos a ventana de busqueda de dispositivos pasandole el usuario y el callback para añadir el dispositivo
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__new_dispositivo_new_dispositivo__["a" /* NewDispositivoPage */], { usuario: this.usuario, callback: this.myCallbackFunction });
    };
    // Función para quitar dispositivo asignado al usuario
    UsuarioPage.prototype.desasignarDispositivo = function () {
        this.usuario.id_dispositivo = '';
    };
    // guardamos los datos en bbdd y navegamos a inicio
    UsuarioPage.prototype.guardar = function () {
        console.log('TODO Guardamos el usuario ', this.usuario);
        this.newUser(this.usuario);
        this.presentAlert();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
        this.navCtrl.goToRoot;
    };
    // alert de aviso de nuevo usuario
    UsuarioPage.prototype.presentAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Nuevo usuario',
            subTitle: 'Usuario nuevo registrado correctamente.',
            buttons: ['Cerrar']
        });
        alert.present();
    };
    UsuarioPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-usuario',template:/*ion-inline-start:"C:\proyectos\locapp_0.2\src\pages\usuario\usuario.html"*/'<!--\n  Página para dar de alta nuevos usuarios y modificar existentes\n  Aquí relacionaremos un usuario con un dispositivo concreto \n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Usuario</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n      <ion-label floating>Nombre</ion-label>\n      <ion-input type="text" value="" [(ngModel)]="usuario.nombre"></ion-input>\n    </ion-item>    \n    <ion-item>\n      <ion-label floating>Primer Apellido</ion-label>\n      <ion-input type="text" value="" [(ngModel)]="usuario.apellido1"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Segundo Apellido</ion-label>\n      <ion-input type="text" value="" [(ngModel)]="usuario.apellido2"></ion-input>\n    </ion-item>    \n    <ion-item>\n      <ion-label floating>Edad</ion-label>\n      <ion-input type="number" value="" [(ngModel)]="usuario.edad"></ion-input>\n    </ion-item>\n    <!-- si subimos imagen debe ir en este punto -->\n  </ion-list>    \n  <div padding>\n    <button ion-button color="light" block (click)=\'asignarDispositivo()\'>Asignar Dispositivo</button>\n    <button ion-button color="primary" block (click)=\'guardar()\'>Guardar</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\proyectos\locapp_0.2\src\pages\usuario\usuario.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], UsuarioPage);
    return UsuarioPage;
}());

//# sourceMappingURL=usuario.js.map

/***/ })

},[315]);
//# sourceMappingURL=main.js.map