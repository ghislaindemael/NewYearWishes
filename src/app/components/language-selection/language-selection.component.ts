import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {CookieService} from '../../services/cookie/cookie.service';

@Component({
  selector: 'app-language-selection',
  standalone: true,
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './language-selection.component.html',
  styleUrl: './language-selection.component.css'
})
export class LanguageSelectionComponent {

    constructor(private cookieService: CookieService) {
    }

    setLanguage(lang: string) {
        this.cookieService.setItem('lang', lang);
    }
}
