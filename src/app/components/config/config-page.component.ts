import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {CookieService} from '../../services/cookie/cookie.service';
import {Router} from '@angular/router';

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

    constructor(private cookieService: CookieService, private router: Router) {
    }

    setLanguage(lang: string) {
        this.cookieService.setItem('lang', lang);
        this.router.navigate(['/intro']);
    }

}
