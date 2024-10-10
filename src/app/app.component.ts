import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CookieService} from './services/cookie/cookie.service';
import {LanguageSelectionComponent} from './components/language-selection/language-selection.component';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, LanguageSelectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    title = 'LesVoeuxDeGhislain';

    constructor(private cookieService: CookieService, private http: HttpClient) {}

    ngOnInit() {
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
}
