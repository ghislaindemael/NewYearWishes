import {Component, ElementRef, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf
  ],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.css'
})
export class IntroPageComponent {

  showTextInput = false;
  introVideoFilepath = "/videos/Intro_ITA_V1.mp4";
  framesBeforeEnd = 2;

  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef<HTMLVideoElement>;

  onVideoEnded() {
    this.showTextInput = true;
  }

  onTimeUpdate(event: Event) {
    const video = this.videoPlayer.nativeElement;
    const currentTime = video.currentTime;
    const duration = video.duration;

    const stopTime = duration - (this.framesBeforeEnd / video.playbackRate);

    if (currentTime >= stopTime) {
      video.pause();
      this.showTextInput = true;
    }
  }


}
