import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {CookieService} from './services/cookie/cookie.service';
import {HttpClient} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {AuthService} from './auth/services/auth/auth.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {LanguageService} from './services/language/language.service';
import {firstValueFrom} from 'rxjs';
import {WishesService} from './services/wishes/wishes.service';

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
        private wishesService: WishesService,
    ) {
        this.checkIfMobile();
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
        } else {
            alert(this.lang.getText('loginfirst'))
        }
    }

    private checkIfMobile() {
        if (this.deviceService.isMobile()) {
            const intervalId = setInterval(() => {
                const warning = this.lang.getText('mobilewarning');

                if (warning) {
                    alert(warning);
                    clearInterval(intervalId);
                }
            }, 100);
        }
    }

    private async checkIfLangIsSet() {
        if (!this.cookieService.getItem('lang')) {
            let firstLang = (await this.getUserLangByCountry()) || 'fr'
            this.cookieService.setItem('lang', firstLang);
            //this.router.navigate(['/config']);
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
        } else {
            alert(this.lang.getText('didntreachwishesyet'))
        }
    }

    async getUserLangByCountry(): Promise<string | undefined> {
        try {
            const response = await firstValueFrom(this.http.get<any>('https://ipapi.co/json/'));
            let lang = 'FR';
            if (response.country_code === 'IT') {
                lang = 'IT';
            } else if (response.country_code === 'GB' || response.country_code === 'US') {
                lang = 'EN';
            }
            return lang;
        } catch (error) {
            console.error('Error getting user country:', error);
            return undefined;
        }
    }

    goToContactPage() {
        this.router.navigate(['/contact'])
    }
}
