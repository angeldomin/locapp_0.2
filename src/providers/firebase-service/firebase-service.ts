import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Usuario } from '../../models/usuario';
import { Firebase } from '@ionic-native/firebase';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/*  
  Este service se encargará de las operaciones con la base de datos firebase.
*/

@Injectable()
export class FirebaseServiceProvider {

  usuariosRef: AngularFireList<any>;
  usuariosSalida$: Observable<any[]>;

  constructor(
    public http: HttpClient,
    private _firebase: Firebase,
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
      _id,
      nombre,
      apellido1,
      apellido2,
      edad,
      imagen,
      id_dispositivo
    });
    var postId = newPostRef.key; // obtenemos el id único
    // TODO TAJO usuariosRef.child("postId").set(_id: postId);
    // console.log(this._firebase.getValue('usuarios', '4ltcRquTh4zI0XbhkMOE'));
    // console.log(usuariosRef);
    console.log('provider firebase');
  }

  editUsuario(usuario:Usuario) {
    // mirar a ver si se hace con set
  }

  deleteUsuario(usuario){ 
    // mirar removeValue() o setValue() null
    const usuariosRef: firebase.database.Reference = firebase.database().ref('/usuarios/');
    var userRef = usuariosRef. child(usuario);
    
  }

  getUsuario() {
    // const usuariosRef: firebase.database.Reference = firebase.database().ref('/usuarios/');
    // console.log(usuariosRef.toJSON);
   
  }

  /*
Temas por hacer:

- Generar apk o buscar método para probarlo en el movil
- Terminar la busqueda de dispositivos y comprobarla 
(necesitamos bluetooth así que necesitamos apk o manera de probarlo en movil para esto)
- Preparar aviso cuando se separe cierta distancia
- Hacer página de configurar distancia para el aviso
- Implementar borrado de usuario de base de datos
- Implementar edición de usuario
- Textos en literales para cambio de idioma etc
- Mostrar mensaje de todo ok cuando damos de alta nuevo usuario porque redirije al inicio 
y no sabemos si ha ido bien -> Con Alert puede quedar bien


Dudas:

- ¿En la pantalla de inicio que queremos que aparezca?

- ¿Que datos serán necesarios de los usuarios (niños)? 
Para saber que quetenemos que guardar en base de  datos y recuperar en los registros.

- Colores, diseño, etc. ¿lo hago como yo vea?
  */

  
} 
