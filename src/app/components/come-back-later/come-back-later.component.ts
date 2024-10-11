import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {LanguageSelectionComponent} from "../language-selection/language-selection.component";
import {NgIf} from "@angular/common";
import {AuthService} from '../../auth/services/auth/auth.service';
import {Router} from '@angular/router';
import {CookieService} from '../../services/cookie/cookie.service';
import {WishesService} from '../../services/wishes/wishes.service';

@Component({
  selector: 'app-come-back-later',
  standalone: true,
    imports: [
        LanguageSelectionComponent,
        NgIf
    ],
  templateUrl: './come-back-later.component.html',
  styleUrl: './come-back-later.component.css'
})
export class ComeBackLaterComponent implements AfterViewInit {
    introVideoFilepath = "/videos/tooearly.mp4";
    secondsBeforeEnd = 0.1;
    isPlaying = false;
    audiofilePath: string = '';

    @ViewChild('videoPlayer', {static: true}) videoPlayer!: ElementRef<HTMLVideoElement>;
    @ViewChild('audioPlayer', {static: true}) audioPlayer!: ElementRef<HTMLAudioElement>;

    constructor(
        private cookieService: CookieService,
        private cdr: ChangeDetectorRef,
    ) {
    }

    ngAfterViewInit() {
        const lang = this.cookieService.getItem('lang');
        this.audiofilePath = `/audiotracks/${lang}/tooearly.mp3`;
        this.cdr.detectChanges();
        this.playVideo();
    }

    onVideoEnded() {
        this.isPlaying = false;
    }

    onTimeUpdate(event: Event) {
        this.isPlaying = true;
        const video = this.videoPlayer.nativeElement;
        const currentTime = video.currentTime;
        const duration = video.duration;

        const stopTime = duration - (this.secondsBeforeEnd / video.playbackRate);

        if (currentTime >= stopTime) {
            video.pause();
            this.audioPlayer.nativeElement.pause();
            this.onVideoEnded();
        }
    }

    playVideo() {
        this.audioPlayer.nativeElement.load();
        this.videoPlayer.nativeElement.load();
        this.audioPlayer.nativeElement.play().then(r => {
            const video = this.videoPlayer.nativeElement;
            video.play();
            this.isPlaying = true;
        });

    }

}
