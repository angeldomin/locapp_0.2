import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Usuario } from '../../models/usuario';
// import { Firebase } from '@ionic-native/firebase';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Profesional } from '../../models/profesional';

/*  
  Este service se encargará de las operaciones con la base de datos firebase.
*/
 
@Injectable()
export class FirebaseServiceProvider {

  usuariosRef: AngularFireList<any>;
  usuariosSalida$: Observable<any[]>;

  profesionalesRef: AngularFireList<any>;
  profesionalesSalida$: Observable<any[]>;

  constructor(
    public http: HttpClient,
    // private _firebase: Firebase,
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

  getUsuario() {
    // const usuariosRef: firebase.database.Reference = firebase.database().ref('/usuarios/');
    // console.log(usuariosRef.toJSON);   
  }

  newProfesional(profesional: Profesional) {        
    const profesionalesRef: firebase.database.Reference = firebase.database().ref('/profesionales/');
    const _id = profesional._id;
    const nombre = profesional.nombre;
    const apellido1 = profesional.apellido1;
    const apellido2 = profesional.apellido2;
    const user = profesional.user;
    const pass = profesional.pass;

    var newPostRef = profesionalesRef.push({
      _id,
      nombre,
      apellido1,
      apellido2,
      user,
      pass
    });

    newPostRef.child("_id").set(newPostRef.key);     
  }

  editProfesional(profesional: Profesional) {    
    console.log('editamos profesional');
    const profesionalesRef: firebase.database.Reference = firebase.database().ref('/profesionales/');
    var profesionalRef = profesionalesRef. child(profesional._id);
    profesionalRef.set(profesional);
  }

  deleteProfesional(profesional: Profesional){     
    const profesionalesRef: firebase.database.Reference = firebase.database().ref('/profesionales/');
    var profesionalRef = profesionalesRef. child(profesional._id);
    profesionalRef.set(null);
    console.log(profesionalRef);
  }
  
} 
