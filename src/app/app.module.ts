import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Firebase } from '@ionic-native/firebase';
import { BLE } from '@ionic-native/ble';
import { NativeAudio } from '@ionic-native/native-audio';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BuscadorPage } from '../pages/buscador/buscador';
import { DispositivosPage } from '../pages/dispositivos/dispositivos';
import { UsuarioPage } from '../pages/usuario/usuario';
import { SuMenuPage } from '../pages/su-menu/su-menu';
import { SuAltaEditPage } from '../pages/su-alta-edit/su-alta-edit';
import { SuListadoProfesionalesPage } from '../pages/su-listado-profesionales/su-listado-profesionales';
import { GuAltaEditGruposPage } from '../pages/gu-alta-edit-grupos/gu-alta-edit-grupos';
import { GuListaGruposPage } from '../pages/gu-lista-grupos/gu-lista-grupos';
import { AudioServiceProvider } from '../providers/audio-service/audio-service';
import { PruebasPage } from '../pages/pruebas/pruebas';

// firebase imports
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { BleServiceProvider } from '../providers/ble-service/ble-service';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { GuMultiscanPage } from '../pages/gu-multiscan/gu-multiscan';

// configuracion de la base de datos proporcionada por mi firebase
export const firebaseConfig = {
  apiKey: "AIzaSyDUv_kWR7GzdL0UE7UrErbKzH1yIxiDDc8",
  authDomain: "locapp-2fc27.firebaseapp.com",
  databaseURL: "https://locapp-2fc27.firebaseio.com",
  projectId: "locapp-2fc27",
  storageBucket: "locapp-2fc27.appspot.com",
  messagingSenderId: "235986032077"
}
firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    BuscadorPage,
    DispositivosPage,
    UsuarioPage,
    LoginPage,
    SuMenuPage,
    SuAltaEditPage,
    SuListadoProfesionalesPage,
    GuAltaEditGruposPage,
    GuListaGruposPage,
    GuMultiscanPage,
    PruebasPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    IonicModule.forRoot(MyApp),    
    AngularFireDatabaseModule,
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    BuscadorPage,
    DispositivosPage,
    UsuarioPage,
    LoginPage,
    SuMenuPage,
    SuAltaEditPage,
    SuListadoProfesionalesPage,
    GuAltaEditGruposPage,
    GuListaGruposPage,
    GuMultiscanPage,
    PruebasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider,
    BLE,
    BleServiceProvider,
    NativeAudio,
    AudioServiceProvider
  ]
})
export class AppModule {}
