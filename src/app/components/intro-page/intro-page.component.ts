import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '../../auth/services/auth/auth.service';
import {LanguageSelectionComponent} from '../language-selection/language-selection.component';
import {CookieService} from '../../services/cookie/cookie.service';
import {WishesService} from '../../services/wishes/wishes.service';

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
    showPasswordInput = false;
    introVideoFilepath = "/videos/intro.mp4";
    secondsBeforeEnd = 0.1;
    isPlaying = false;
    debounceTimeout: any;
    audiofilePath: string = '';


    @ViewChild('videoPlayer', {static: true}) videoPlayer!: ElementRef<HTMLVideoElement>;
    @ViewChild('audioPlayer', {static: true}) audioPlayer!: ElementRef<HTMLAudioElement>;
    @ViewChild('passwordInput', { static: true }) passwordInput!: ElementRef<HTMLInputElement>;


    constructor(
        private authService: AuthService,
        private router: Router,
        private cookieService: CookieService,
        private cdr: ChangeDetectorRef,
        private renderer: Renderer2,
        private wishesService: WishesService
    ) {
    }

    ngAfterViewInit() {
        const lang = this.cookieService.getItem('lang');
        this.audiofilePath = `/audiotracks/${lang}/intro.mp3`;
        this.cdr.detectChanges();
    }

    onVideoEnded() {


        if(this.introVideoFilepath.includes("intro.mp4")){
            this.showPasswordInput = true;
        } else {
            this.areWishesReadyForUser();
        }
    }

    async areWishesReadyForUser() {
        if (await this.wishesService.areWishesReady()) {
            this.router.navigate(['/userselect']);
        } else {
            this.router.navigate(['/comebacklater']);
        }
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
        if (value.length >= 12) {
            const success = await this.authService.authenticateUser(value);
            if (success) {
                this.showPasswordInput = false;
                this.introVideoFilepath = "/videos/intro2.mp4";
                this.videoPlayer.nativeElement.load();
            }
        }
    }
}
