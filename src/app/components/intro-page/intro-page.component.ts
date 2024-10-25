import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '../../auth/services/auth/auth.service';
import {CookieService} from '../../services/cookie/cookie.service';
import {WishesService} from '../../services/wishes/wishes.service';
import {LogService} from '../../services/log/log.service';
import {NotReadyYetPopupComponent} from '../not-ready-yet-popup/not-ready-yet-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {LanguageService} from '../../services/language/language.service';


@Component({
    selector: 'app-intro-page',
    standalone: true,
    imports: [
        RouterOutlet,
        NgIf,
        NotReadyYetPopupComponent
    ],
    templateUrl: './intro-page.component.html',
    styleUrl: './intro-page.component.css'
})
export class IntroPageComponent implements OnInit, AfterViewInit {
    showPasswordInput = false;
    introVideoFilepath = "";
    secondsBeforeEnd = 0.1;
    isPlaying = false;
    debounceTimeout: any;

    @ViewChild('videoPlayer', {static: true}) videoPlayer!: ElementRef<HTMLVideoElement>;
    @ViewChild('passwordInput', {static: true}) passwordInput!: ElementRef<HTMLInputElement>;

    constructor(
        private authService: AuthService,
        private router: Router,
        private cookieService: CookieService,
        private cdr: ChangeDetectorRef,
        private wishesService: WishesService,
        private logService: LogService,
        private dialog: MatDialog,
        protected lang: LanguageService
    ) {
        const language = this.cookieService.getItem('lang');
        this.introVideoFilepath = `/videos/${language}/intro_qualite.mp4`;
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        const language = this.cookieService.getItem('lang');
        this.introVideoFilepath = `/videos/${language}/intro_qualite.mp4`;
        this.cdr.detectChanges();
    }

    onVideoEnded() {
        if (this.introVideoFilepath.includes("intro_qualite.mp4")) {
            this.isPlaying = false;
            this.showPasswordInput = true;
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
            this.onVideoEnded();
        }
    }

    playVideo() {
        this.videoPlayer.nativeElement.load();
        this.videoPlayer.nativeElement.play();
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
        if (value.length >= 12) {
            await this.logService.logPasswordAttempt(value);
            const success = await this.authService.authenticateUser(value);
            if (success) {
                this.router.navigate(['userselect']);
            }
        }
    }

    skipVideo() {
        const video = this.videoPlayer.nativeElement;
        video.currentTime = video.duration - (this.secondsBeforeEnd / video.playbackRate);
    }




}
