import {Injectable} from '@angular/core';
import {CookieService} from '../cookie/cookie.service';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    private language = 'fr';
    private dictionary: { [key: string]: { [key: string]: string } } = {
        fr: {
            questionremarque: 'Question ? Remarque ?',
            complaintoffice: 'Bureau des plaintes',
            complaintform: 'Formulaire de plainte',
            yourname: 'Ton nom',
            howtocontact: 'Un moyen de te contacter',
            yourcomplaint: 'Ta plainte',
            send: 'Envoyer'
        },
        en: {
            questionremarque: 'Question ? Opinion ?',
            complaintoffice: 'Complaint office',
            complaintform: 'Complaint form',
            yourname: 'Your name',
            howtocontact: 'A way to contact you',
            yourcomplaint: 'Your complaint',
            send: 'Send'
        },
        it: {
            questionremarque: 'Domanda ? Reclamo ?',
            complaintoffice: 'Ufficio reclami',
            complaintform: 'Modulo di reclamo',
            yourname: 'Il tuo nome',
            howtocontact: 'Un modo per contattarti',
            yourcomplaint: 'Il tuo reclamo',
            send: 'Inviare'

        }
    };

    constructor(private cookieService: CookieService) {
        this.language = this.cookieService.getItem('lang') || 'fr';
    }

    setLanguage(lang: string) {
        this.language = lang;
    }

    getText(slug: string): string {
        return this.dictionary[this.language]?.[slug] || '';
    }
}
