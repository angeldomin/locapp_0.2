import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { BuscadorPage } from '../pages/buscador/buscador';
import { DispositivosPage } from '../pages/dispositivos/dispositivos';
import { UsuarioPage } from '../pages/usuario/usuario';
import { LoginPage } from '../pages/login/login';
import { SuMenuPage } from '../pages/su-menu/su-menu';
import { SuAltaEditPage } from '../pages/su-alta-edit/su-alta-edit';
import { SuListadoProfesionalesPage } from '../pages/su-listado-profesionales/su-listado-profesionales';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    
    this.pages = [
      { title: 'Inicio', component: HomePage },
      { title: 'Nuevo Usuario', component: UsuarioPage },
      { title: 'Usuarios', component: ListPage },
      { title: 'Dispositivos', component: DispositivosPage },
      { title: 'Buscador', component: BuscadorPage },
      { title: 'Login', component: LoginPage },
      { title: 'SU_MENU', component: SuMenuPage },
      { title: 'SU_ALTA_EDIT', component: SuAltaEditPage },
      { title: 'SU_LISTA_PROF', component: SuListadoProfesionalesPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
