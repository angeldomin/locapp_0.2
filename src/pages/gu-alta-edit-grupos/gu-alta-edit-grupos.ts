import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Grupo } from '../../models/grupo';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { UsuarioPage } from '../usuario/usuario';
import { ListPage } from '../list/list';
import { Usuario } from '../../models/usuario';

@IonicPage()
@Component({
  selector: 'page-gu-alta-edit-grupos',
  templateUrl: 'gu-alta-edit-grupos.html',
})
export class GuAltaEditGruposPage {

  grupoForm: FormGroup;
  grupo: Grupo;
  modo: String;
  isEdit: Boolean;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public _firebaseService: FirebaseServiceProvider,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    if (navParams.get('grupo')) {
      this.grupo = navParams.get('grupo');
      if (!this.grupo.usuarios) {
        this.grupo.usuarios = [];
      }
    } else {
      this.grupo = new Grupo('', '', []);
    }
    if (navParams.get('mode')) {
      this.modo = navParams.get('mode');
    } else {
      this.modo = '';
    }
    if (this.modo==='edit') {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }

    this.grupoForm = this.formBuilder.group({
      nombre: ['', Validators.required]      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuAltaEditGruposPage');
  }

  agregarUsuario() {
    if (this.grupo._id === '') { console.log('creamos nuevo grupo porque id es vacio');
      this.grupo._id = this._firebaseService.newGrupo(this.grupo); console.log(this.grupo._id);
    }
    // his.navCtrl.push(ListPage, {grupo: this.grupo});
    // setTimeout(this.navCtrl.push(ListPage, {grupo: this.grupo}), 5000);
    //setTimeout(() => {
      this.navCtrl.push(ListPage, {grupo: this.grupo});
    // }, 5000);
  }

  guardar() {
    if (this.modo === 'new') {      
      this._firebaseService.newGrupo(this.grupo);
      console.log('Nuevo grupo dado de alta correctamente.');
      let alert = this.alertCtrl.create({
        title: 'Grupo creado.',
        subTitle: 'El nuevo grupo '+this.grupo.nombre+' ha sido dado de alta correctamente.',
        buttons: ['Aceptar']
      });
      alert.present();
      this.navCtrl.pop();
    } else if (this.modo === 'edit') {
      this._firebaseService.editGrupo(this.grupo);
      console.log('Edición de grupo correcta.');
      let alert = this.alertCtrl.create({
        title: 'Grupo modificado.',
        subTitle: 'El grupo '+this.grupo.nombre+' ha sido actualizado correctamente.',
        buttons: ['Aceptar']
      });
      alert.present();
      this.navCtrl.pop();
    } else {
      console.log('Error al guardar grupo, modo no definido');
      let alert = this.alertCtrl.create({
        title: 'ERROR',
        subTitle: 'Error al guardar grupo, modo no definido.',
        buttons: ['Aceptar']
      });
      alert.present();
    }
  }

  volver() {
    console.log('Volver');
    this.navCtrl.pop();
  }

  borrar(usuario: Usuario) {
    
  }

}
