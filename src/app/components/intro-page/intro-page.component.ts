import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '../../auth/services/auth/auth.service';
import {LanguageSelectionComponent} from '../language-selection/language-selection.component';
import {CookieService} from '../../services/cookie/cookie.service';

@Component({
    selector: 'app-intro-page',
    standalone: true,
    imports: [
        RouterOutlet,
        NgIf,
        LanguageSelectionComponent
    ],
    templateUrl: './intro-page.component.html',
    styleUrl: './intro-page.component.css'
})
export class IntroPageComponent implements AfterViewInit {
    showTextInput = false;
    introVideoFilepath = "/videos/intro.mp4";
    seconds = 0.2;
    isPlaying = false;
    debounceTimeout: any;
    audiofilePath: string = '';


    @ViewChild('videoPlayer', {static: true}) videoPlayer!: ElementRef<HTMLVideoElement>;
    @ViewChild('audioPlayer', {static: true}) audioPlayer!: ElementRef<HTMLAudioElement>;

    constructor(
        private authService: AuthService,
        private router: Router,
        private cookieService: CookieService,
        private cdr: ChangeDetectorRef) {
    }

    ngAfterViewInit() {
        const lang = this.cookieService.getItem('lang');
        this.audiofilePath = `/audiotracks/${lang}/intro.mp3`;
        this.cdr.detectChanges();
    }

    onVideoEnded() {
        this.showTextInput = true;
        this.audioPlayer.nativeElement.pause();
    }

    onTimeUpdate(event: Event) {
        this.isPlaying = true;
        const video = this.videoPlayer.nativeElement;
        const currentTime = video.currentTime;
        const duration = video.duration;

        const stopTime = duration - (this.seconds / video.playbackRate);

        if (currentTime >= stopTime) {
            video.pause();
            this.audioPlayer.nativeElement.pause();
            this.showTextInput = true;
        }
    }

    playVideo() {
        const video = this.videoPlayer.nativeElement;
        video.play();
        this.audioPlayer.nativeElement.play();
        this.isPlaying = true;
    }

    onAudioEnded() {
        this.videoPlayer.nativeElement.pause();
        this.showTextInput = true;
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
            if (success) {
                this.router.navigate(["/userselect"]);
            }
        }
    }
}
