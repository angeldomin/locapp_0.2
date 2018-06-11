import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Profesional } from '../../models/profesional';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-su-alta-edit',
  templateUrl: 'su-alta-edit.html',
})
export class SuAltaEditPage {

  profesionalForm: FormGroup;
  profesional: Profesional;
  modo: String;
  isEdit: Boolean;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public _firebaseService: FirebaseServiceProvider,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    
    if (navParams.get('profesional')) {
      this.profesional = navParams.get('profesional');
    } else {
      this.profesional = new Profesional('', '', '', '', '', '');
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

    this.profesionalForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuAltaEditPage');
  }

  guardar() {
    if (this.modo === 'new') {      
      if (this._firebaseService.newProfesional(this.profesional)) { // si el alta ha sido correcta devuelve true
        console.log('Nuevo profesional dado de alta correctamente.');
        let alert = this.alertCtrl.create({
          title: 'Profesional creado.',
          subTitle: 'El nuevo profesional '+this.profesional.user+' ha sido dado de alta correctamente.',
          buttons: ['Aceptar']
        });
        alert.present();
        this.navCtrl.pop();
      }
    } else if (this.modo === 'edit') {
      this._firebaseService.editProfesional(this.profesional);
      console.log('Edición de profesional correcta.');
      let alert = this.alertCtrl.create({
        title: 'Profesional modificado.',
        subTitle: 'El profesional '+this.profesional.user+' ha sido actualizado correctamente.',
        buttons: ['Aceptar']
      });
      alert.present();
      this.navCtrl.pop();
    } else {
      console.log('Error al guardar profesional, modo no definido');
      let alert = this.alertCtrl.create({
        title: 'ERROR',
        subTitle: 'Error al guardar profesional, modo no definido.',
        buttons: ['Aceptar']
      });
      alert.present();
    }
  }

  volver() {
    console.log('Volver');
    this.navCtrl.pop();
  }

}
