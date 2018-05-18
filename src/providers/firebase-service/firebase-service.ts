import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Usuario } from '../../models/usuario';
// import { Firebase } from '@ionic-native/firebase';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Profesional } from '../../models/profesional';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController, Loading, LoadingController } from 'ionic-angular';
import { Grupo } from '../../models/grupo';

/*  
  Este service se encargará de las operaciones con la base de datos firebase.
*/
 
@Injectable()
export class FirebaseServiceProvider {

  usuariosRef: AngularFireList<any>;
  usuariosSalida$: Observable<any[]>;

  profesionalesRef: AngularFireList<any>;
  profesionalesSalida$: Observable<any[]>;

  gruposRef: AngularFireList<any>;
  gruposSalida$: Observable<any[]>;

  public loading: Loading;

  constructor(
    public http: HttpClient,
    // private _firebase: Firebase,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public dataBase: AngularFireDatabase
  ) {
    console.log('Hello FirebaseServiceProvider Provider');
    firebase.auth().signInAnonymously().catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      var errorMessage = error.message;
      console.log('error en signInAnonymously', errorMessage);
    });

    firebase.auth().onAuthStateChanged(function(user) {
      console.log('Cambio en auth');
      if (user) {
        // User is signed in.
        // var isAnonymous = user.isAnonymous;
        var uid = user.uid; console.log(' :O ',uid);
        /* var userRef = app.dataInfo.child(app.users);
    
        var useridRef = userRef.child(app.userid);
    
        useridRef.set({
          locations: "",
          theme: "",
          colorScheme: "",
          food: ""
        });*/
    
      } else {
        // User is signed out.
        // ...
      }
      // ...
    });

    this.usuariosRef = this.dataBase.list('/usuarios/');
    this.usuariosSalida$ = this.usuariosRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.profesionalesRef = this.dataBase.list('/profesionales/');
    this.profesionalesSalida$ = this.profesionalesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.gruposRef = this.dataBase.list('/grupos/');
    this.gruposSalida$ = this.gruposRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }
 
  newUsuario(usuario:Usuario) {
        
    const usuariosRef: firebase.database.Reference = firebase.database().ref('/usuarios/');
        
    const _id = usuario._id;
    const nombre = usuario.nombre;
    const apellido1 = usuario.apellido1;
    const apellido2 = usuario.apellido2;
    const edad = usuario.edad;
    const imagen = usuario.image;
    const id_dispositivo = usuario.id_dispositivo;
    
    // mirar aquí https://firebase.google.com/docs/database/admin/save-data    
    var newPostRef = usuariosRef.push({
      _id,
      nombre,
      apellido1,
      apellido2,
      edad,
      imagen,
      id_dispositivo
    });

    // seteamos el id para luego poder buscar con la referencia unica autogenerada
    newPostRef.child("_id").set(newPostRef.key); 
    
  }

  editUsuario(usuario:Usuario) {    
    console.log('editamos usuario');
    const usuariosRef: firebase.database.Reference = firebase.database().ref('/usuarios/');
    var userRef = usuariosRef. child(usuario._id);
    userRef.set(usuario);
  }

  deleteUsuario(usuario){ 
    // mirar removeValue() o setValue() null
    const usuariosRef: firebase.database.Reference = firebase.database().ref('/usuarios/');
    var userRef = usuariosRef. child(usuario._id);
    userRef.set(null);
    console.log(userRef);
  }
  
  /* Para usar la autenticación que proporciona firebase tenemos que adaptarnos. Esa autenticación se basa en 
  email+password, pero nosotros queremso hacerlo por usuario y pass. Para que firebase acepte el usuarrio
  le añado el @locapp.com y así lo toma como email. Eso por un lado, así damos de alta el usuario para el logado
  y por otro lado si el alta ha sido correcta, guardamos los datos del profesional en la base de datos. Guardamos
  el id que se autogenera y se lo asiganmos a la variable _id del profesional, para luego poder acceder a este 
  profesional concretamente */
  newProfesional(profesional: Profesional) {

    const profesionalesRef: firebase.database.Reference = firebase.database().ref('/profesionales/');
    const _id = profesional._id;
    const nombre = profesional.nombre;
    const apellido1 = profesional.apellido1;
    const apellido2 = profesional.apellido2;
    const user = profesional.user;
    const pass = '********'; // mejor no guardar la pass // profesional.pass;

    this.afAuth.auth.createUserWithEmailAndPassword(profesional.user+'@locapp.com', profesional.pass)
    .then(
      res => {                
        var newPostRef = profesionalesRef.push({
          _id,
          nombre,
          apellido1,
          apellido2,
          user,
          pass
        });
        newPostRef.child("_id").set(newPostRef.key);        

      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });       
  }

  /* Cambiamos los campos que recojemos de pantalla en el profesional que está dado de alta. No es posible
  cambiar la pass ni el usuario, sobre el resto de datos del profesional si que podemos hacer un update en la base de datos. Para encontrar el profesional al que 
  queremos hacer referencia, usamos el _id.*/
  editProfesional(profesional: Profesional) {    
    console.log('editamos profesional');
    const profesionalesRef: firebase.database.Reference = firebase.database().ref('/profesionales/');
    var profesionalRef = profesionalesRef.child(profesional._id);
    profesionalRef.set(profesional);
  }

  /* Podemos borrar de base de datos el profesional pero la cuenta de acceso hay que borrarla desde firebase.*/
  deleteProfesional(profesional: Profesional){     
    const profesionalesRef: firebase.database.Reference = firebase.database().ref('/profesionales/');
    var profesionalRef = profesionalesRef. child(profesional._id);
    profesionalRef.set(null);
    console.log(profesionalRef);
  }

  newGrupo(grupo: Grupo) {        
    const gruposRef: firebase.database.Reference = firebase.database().ref('/grupos/');        
    const _id = grupo._id;
    const nombre = grupo.nombre;
    const usuarios = grupo.usuarios;    
     
    var newPostRef = gruposRef.push({
      _id,
      nombre,
      usuarios
    });
    
    newPostRef.child("_id").set(newPostRef.key);     
  }

  editGrupo(grupo: Grupo) {
    console.log('editamos grupo');
    const gruposRef: firebase.database.Reference = firebase.database().ref('/grupos/');
    var grupoRef = gruposRef.child(grupo._id);
    grupoRef.set(grupo);
  }

  deleteGrupo(grupo: Grupo) {
    console.log('borramos grupo');
    const gruposRef: firebase.database.Reference = firebase.database().ref('/grupos/');
    var grupoRef = gruposRef. child(grupo._id);
    grupoRef.set(null);    
  }
  
} 
