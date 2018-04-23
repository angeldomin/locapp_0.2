import { Component,  ElementRef,  ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../models/usuario';

/**
 * Generated class for the BuscadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buscador',
  templateUrl: 'buscador.html',
})
export class BuscadorPage {

  NUMERO_DE_ARCOS = 6;

  @ViewChild('canvas') canvasEl : ElementRef;

  /** Reference Canvas object  */
  private _CANVAS  : any;

  /** Reference the context for the Canvas element  */
  private _CONTEXT : any;

  usuario: Usuario;
  modo: String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (navParams.get('usuario')) {
      this.usuario = navParams.get('usuario');
    } else {
      this.usuario = new Usuario('', '', '', '', 0, '', '');
    }

    if (navParams.get('mode')) {
      this.modo = navParams.get('mode');
    } else {
      this.modo = '';
    }
    
    
    console.log('Usuario: ', this.usuario);
    console.log('Modo: ',this.modo);
  }

  ionViewDidLoad() {    
    this._CANVAS 	    = this.canvasEl.nativeElement;
    this._CANVAS.width  	= 250;
    this._CANVAS.height 	= 250;    
    this.initialiseCanvas();    
  }

  initialiseCanvas() {
    if(this._CANVAS.getContext) {
        this.setupCanvas();
    }
  }

  setupCanvas() {
    this._CONTEXT = this._CANVAS.getContext('2d');
    this._CONTEXT.fillStyle = "#6b9b83";
    this._CONTEXT.fillRect(0, 0, 500, 500);
  }

  clearCanvas() {
    this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
    this.setupCanvas();
  }

  drawCircle() {
    this.clearCanvas();
    this._CONTEXT.beginPath();
    // x, y, radius, startAngle, endAngle
    this._CONTEXT.arc(this._CANVAS.width/2, this._CANVAS.height/2, 120, 0, 2 * Math.PI);  
    this._CONTEXT.arc(this._CANVAS.width/2, this._CANVAS.height/2, 100, 0, 2 * Math.PI);    
    this._CONTEXT.arc(this._CANVAS.width/2, this._CANVAS.height/2, 80, 0, 2 * Math.PI);    
    this._CONTEXT.lineWidth = 1;
    this._CONTEXT.strokeStyle = '#ffffff';
    this._CONTEXT.stroke(); 
    this._CONTEXT.closePath();    
    this._CONTEXT.beginPath();
    this._CONTEXT.arc(this._CANVAS.width/2, this._CANVAS.height/2, 60, 0, 2 * Math.PI);    
    this._CONTEXT.lineWidth = 2;
    this._CONTEXT.strokeStyle = '#c82124';
    this._CONTEXT.stroke(); 
    this._CONTEXT.closePath();
    this._CONTEXT.beginPath();    
    this._CONTEXT.arc(this._CANVAS.width/2, this._CANVAS.height/2, 40, 0, 2 * Math.PI);
    this._CONTEXT.arc(this._CANVAS.width/2, this._CANVAS.height/2, 20, 0, 2 * Math.PI);    
    this._CONTEXT.lineWidth = 1;
    this._CONTEXT.strokeStyle = '#ffffff';
    this._CONTEXT.stroke(); 
    this._CONTEXT.closePath();
  }

  // le pasaremos un número que puede ser directamente el valor de la potencia de la señal
  // y a partir de eso calculará el círculo a pintar en rojo y el resto en gris
  drawRadar(senial:number) {
    let radio_max = 120; // seteo el radio exterior
    let radio = radio_max;
    let arco_actual = this.NUMERO_DE_ARCOS;
    // distancia tendrá el arco que corresponde para esa señal
    let distancia = Math.round(senial/(radio/this.NUMERO_DE_ARCOS));//radio es el arco mas grande posible
    this.clearCanvas();
    // dibujamos los arcos
    for(let i = 0; i < this.NUMERO_DE_ARCOS; i++) {
      console.log('Distancia =', distancia);
      console.log('Arco actual =', arco_actual);
      this._CONTEXT.beginPath();
      if (distancia===arco_actual) {
        this._CONTEXT.arc(this._CANVAS.width/2, this._CANVAS.height/2, radio, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle 
        this._CONTEXT.lineWidth = 5;
        this._CONTEXT.strokeStyle = '#c82124';
      } else {
        this._CONTEXT.arc(this._CANVAS.width/2, this._CANVAS.height/2, radio, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle 
        this._CONTEXT.lineWidth = 1;
        this._CONTEXT.strokeStyle = '#ffffff';
      }      
      this._CONTEXT.stroke(); 
      this._CONTEXT.closePath();
      radio = radio - (radio_max/this.NUMERO_DE_ARCOS);
      arco_actual--;
    }

    // o bien metemos aquí la lógica de señalar si vamos en buena dirección o la pasamos a otro sitio
    this._CONTEXT.beginPath();
    this._CONTEXT.moveTo(this._CANVAS.width/2, this._CANVAS.height/2);
    this._CONTEXT.lineTo(this._CANVAS.width/2, 5);
    this._CONTEXT.lineTo(this._CANVAS.width/2-30, 60);
    this._CONTEXT.moveTo(this._CANVAS.width/2+30, 60);
    this._CONTEXT.lineTo(this._CANVAS.width/2, 5);
    //this._CONTEXT.lineJoin = 'miter'; // para terminar en punta pero no le hago funcionar :(
    this._CONTEXT.lineCap="round";
    this._CONTEXT.lineWidth = 15;
    this._CONTEXT.strokeStyle = '#c82124';
    this._CONTEXT.stroke(); 
    this._CONTEXT.closePath();
  }

}
