import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { SuMenuPage } from '../su-menu/su-menu';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  myForm: FormGroup;
  user: Observable<firebase.User>;
  public loading:Loading

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    this.myForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.user = afAuth.authState;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUser(){  
    this.afAuth.auth.signInWithEmailAndPassword(this.myForm.value.usuario+'@locapp.com', this.myForm.value.password).then(() => {
      console.log("User logging");      
      if (this.myForm.value.usuario === 'super') { // si el usuario es el SU navegamos a su menú
        this.navCtrl.push(SuMenuPage);
      } else { // si el usuario no es el SU vamos a la aplicacion normal
        this.navCtrl.push(HomePage);
      }
      // this.navCtrl.setRoot('HomePage');
    }, (err) => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: err.message,
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

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }
  
}
