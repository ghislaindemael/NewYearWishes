import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {CookieService} from './services/cookie/cookie.service';
import {HttpClient} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {AuthService} from './auth/services/auth/auth.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {LanguageService} from './services/language/language.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatDialogModule, NgIf],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    title = 'LesVoeuxDeGhislain';
    currentUrl: string = '';

    constructor(
        protected cookieService: CookieService,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService,
        private deviceService: DeviceDetectorService,
        protected lang: LanguageService,
    ) {
        this.checkIfNotMobile();
        this.checkIfLangIsSet();
    }

    ngOnInit() {
        this.router.events.subscribe(() => {
            this.currentUrl = this.router.url;
            //console.log(this.currentUrl);
        });

    }

    goToComplaintOffice() {
        this.router.navigate(['/complaintoffice'])
    }

    goBack() {
        this.router.navigate(['/']);
    }

    async skipLogin() {
        if (await this.authService.isLoggedIn()) {
            //console.log("Already logged in");
            this.router.navigate(['/userselect']);
        }
    }

    private checkIfNotMobile() {
        if(this.deviceService.isMobile()){
            this.router.navigate(['/nomobile']);
        }
    }

    private checkIfLangIsSet() {
        if(!this.cookieService.getItem('lang')){
            this.router.navigate(['/config']);
        }
    }

    playMusic() {
        const audio = document.getElementById('mibemol') as HTMLAudioElement;
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    }

    chooseLanguage() {
        this.router.navigate(['/config']);
    }

    goToWishes() {
        if(this.cookieService.getItem('reachedwishes')){
            this.router.navigate(['/wishes']);
        }
    }
}
