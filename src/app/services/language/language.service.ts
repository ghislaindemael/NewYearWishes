import {Injectable} from '@angular/core';
import {CookieService} from '../cookie/cookie.service';
import {DatabaseService} from '../database/database.service';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    private language: string;
    public dictionary: { [key: string]: string } = {};

    constructor(private cookieService: CookieService, private databaseService: DatabaseService) {
        this.language = this.cookieService.getItem('lang') || 'fr';
        this.loadTranslations();
    }

    async loadTranslations(): Promise<void> {
        this.dictionary = await this.databaseService.getTranslationsDictionary(this.language);
    }

    getText(slug: string): string {
        return this.dictionary[slug] || '';
    }

    setLanguage(lang: string) {
        this.language = lang;
    }
}
