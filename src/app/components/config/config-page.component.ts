import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {CookieService} from '../../services/cookie/cookie.service';
import {Router} from '@angular/router';
import {LanguageService} from '../../services/language/language.service';

@Component({
  selector: 'app-config',
  standalone: true,
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './config-page.component.html',
  styleUrl: './config-page.component.css'
})
export class ConfigPageComponent {

    constructor(private cookieService: CookieService, private router: Router, private lang: LanguageService) {
    }

    setLanguage(lang: string) {
        this.cookieService.setItem('lang', lang);
        this.lang.setLanguage(lang);
        this.router.navigate(['/intro']).then(r => window.location.reload());
    }

}
