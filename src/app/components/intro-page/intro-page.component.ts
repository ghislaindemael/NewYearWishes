import { Component, ElementRef, ViewChild } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { NgIf } from '@angular/common';
import {AuthService} from '../../auth/services/auth/auth.service';

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
  debounceTimeout: any;

  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef<HTMLVideoElement>;

  constructor(private authService: AuthService, private router: Router) {
  }

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

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const text = inputElement.value;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(() => {
      this.onTextChange(text);
    }, 500);
  }

  async onTextChange(value: string) {
    if (value.length >= 10) {
      const success = await this.authService.authenticateUser(value);
      if(success){
          this.router.navigate(["/userselect"]);
      }
    }
  }
}
