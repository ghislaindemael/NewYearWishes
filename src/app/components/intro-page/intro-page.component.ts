import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

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
  introVideoFilepath = "/videos/Intro_ITA_V2.mp4";
  seconds = 0.2;
  isPlaying = false;

  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef<HTMLVideoElement>;

  onVideoEnded() {
    this.showTextInput = true;
  }

  onTimeUpdate(event: Event) {
    this.isPlaying = true;
    const video = this.videoPlayer.nativeElement;
    const currentTime = video.currentTime;
    const duration = video.duration;

    const stopTime = duration - (this.seconds / video.playbackRate);

    if (currentTime >= stopTime) {
      video.pause();
      this.showTextInput = true;
    }
  }

  playVideo() {
    const video = this.videoPlayer.nativeElement;
    video.play();
    this.isPlaying = true;
  }
}
