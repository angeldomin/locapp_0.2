import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio';

@Injectable()
export class AudioServiceProvider {

  constructor(
    public http: HttpClient,
    private nativeAudio: NativeAudio
  ) {
    console.log('Hello AudioServiceProvider Provider');
  }

  warning() {
    // this.nativeAudio.preloadSimple('warning', 'assets/audio/Bleep.mp3').then(
    //   () => this.nativeAudio.play('warning')
    // );
    // this.nativeAudio.preloadSimple('warning', 'assets/audio/Bleep.mp3');
    // this.nativeAudio.play('warning');
    this.nativeAudio.loop('warning');   
    // this.nativeAudio.unload('warning');
  }

  stopWarning() {
    this.nativeAudio.stop('warning');
  }

  danger() {
    // this.nativeAudio.preloadComplex('danger', 'assets/audio/RadioInterruption.mp3', 1, 1, 0);
    // this.nativeAudio.play('danger');
    this.nativeAudio.loop('danger');
    // this.nativeAudio.unload('danger');
  }

  stopDanger() {
    this.nativeAudio.stop('danger');
  }

}
