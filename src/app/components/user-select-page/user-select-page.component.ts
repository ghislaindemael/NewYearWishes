import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {AuthService} from '../../auth/services/auth/auth.service';
import {Router} from '@angular/router';
import {CookieService} from '../../services/cookie/cookie.service';
import {WishesService} from '../../services/wishes/wishes.service';
import {MatDialog} from '@angular/material/dialog';
import {NotReadyYetPopupComponent} from '../not-ready-yet-popup/not-ready-yet-popup.component';
import {UserLabel} from '../../types/UserLabel.type';
import {OhReallyPopupComponent} from '../oh-really-popup/oh-really-popup.component';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-user-select-page',
  standalone: true,
    imports: [
        NgIf,
        NgForOf
    ],
  templateUrl: './user-select-page.component.html',
  styleUrl: './user-select-page.component.css'
})
export class UserSelectPageComponent implements OnInit, AfterViewInit {
    showUsernames: boolean = false;
    videoPath = "";
    secondsBeforeEnd = 0.1;
    isPlaying = false;
    userlabels: UserLabel[] = [];
    namesToDisplay: number = 30;
    isMobile: boolean = false;

    @ViewChild('videoPlayer', {static: true}) videoPlayer!: ElementRef<HTMLVideoElement>;
    @ViewChild('passwordInput', {static: true}) passwordInput!: ElementRef<HTMLInputElement>;

    constructor(
        private authService: AuthService,
        private router: Router,
        private cookieService: CookieService,
        private cdr: ChangeDetectorRef,
        private wishesService: WishesService,
        private dialog: MatDialog,
        private deviceService: DeviceDetectorService
    ) {
        this.videoPath = `/videos/user_select.mp4`;
        if(deviceService.isMobile()){
            this.namesToDisplay = 10
            this.isMobile = true;
        }
    }

    async ngOnInit() {
        const currentUserEmail = await this.authService.getCurrentUserEmail();

        this.userlabels = await this.wishesService.getUserLabelList();

        const currentUserIndex = this.userlabels.findIndex(user => user.app_email === currentUserEmail);
        let currentUser = null;
        if (currentUserIndex !== -1) {
            currentUser = this.userlabels.splice(currentUserIndex, 1)[0];
        }

        for (let i = this.userlabels.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.userlabels[i];
            this.userlabels[i] = this.userlabels[j];
            this.userlabels[j] = temp;
        }

        if (currentUser) {
            this.userlabels.splice(Math.floor(Math.random() * Math.min(this.namesToDisplay, this.userlabels.length + 1)), 0, currentUser);
        }

        this.userlabels = this.userlabels.slice(0, this.namesToDisplay);
    }

    ngAfterViewInit() {
        this.videoPath = `/videos/user_select.mp4`;
        this.cdr.detectChanges();
    }

    onVideoEnded() {
        if (this.videoPath.includes("user_select.mp4")) {
            this.isPlaying = false;
            this.showUsernames = true;
        } else {
            //Navigate to wishes component
            this.router.navigate(['/wishes'])
        }
    }

    onTimeUpdate(event: Event) {
        this.isPlaying = true;
        this.showUsernames = false;
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
        this.showUsernames = false;
    }

    skipVideo() {
        const video = this.videoPlayer.nativeElement;
        video.currentTime = video.duration - (this.secondsBeforeEnd / video.playbackRate);
    }

    async selectUser(user: UserLabel) {
        //console.log(email);
        if (this.authService.doesEmailBelongToUser(user.app_email)) {
            if (user.ready) {
                this.showUsernames = false;
                this.videoPath = '/videos/you_may_enter.mp4';
                this.playVideo()
            } else {
                this.dialog.open(NotReadyYetPopupComponent, {
                    panelClass: 'custom-dialog-container',
                });
            }

        } else {
            this.dialog.open(OhReallyPopupComponent, {
                panelClass: 'custom-dialog-container',
            });
        }
    }

}
