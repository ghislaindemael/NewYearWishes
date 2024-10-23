import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {CookieService} from './services/cookie/cookie.service';
import {LanguageSelectionComponent} from './components/language-selection/language-selection.component';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, LanguageSelectionComponent, MatDialogModule, NgIf],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    title = 'LesVoeuxDeGhislain';
    currentUrl: string = '';

    constructor(
        private cookieService: CookieService,
        private http: HttpClient,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.router.events.subscribe(() => {
            this.currentUrl = this.router.url;
            //console.log(this.currentUrl);
        });

        if (this.cookieService.getItem('lang') == null) {
            this.getUserCountry().then(country => {
                let lang = 'FR';
                if (country === 'IT') {
                    lang = 'IT';
                } else if (country === 'GB' || country === 'US') {
                    lang = 'EN';
                }
                this.cookieService.setItem('lang', lang);
            });
        }
    }

    async getUserCountry(): Promise<string> {
        try {
            const response = await firstValueFrom(this.http.get<any>('https://ipapi.co/json/'));
            //console.log(response);
            return response.country_code;
        } catch (error) {
            console.error('Error getting user country:', error);
            return 'FR';
        }
    }

    goToComplaintOffice() {
        this.router.navigate(['/complaintoffice'])
    }

    goBack() {
        this.router.navigate(['/']);
    }
}
