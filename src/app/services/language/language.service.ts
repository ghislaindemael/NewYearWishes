import {Injectable} from '@angular/core';
import {CookieService} from '../cookie/cookie.service';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    private language: string;
    private dictionary: { [key: string]: { [key: string]: string } } = {
        fr: {
            questionremarque: 'Question ? Remarque ?',
            complaintoffice: 'Bureau des plaintes',
            complaintform: 'Formulaire de plainte',
            yourname: 'Ton nom',
            howtocontact: 'Un moyen de te contacter',
            yourcomplaint: 'Ta plainte',
            send: 'Envoyer',
            thankyoufor: 'Merci pour'
        },
        en: {
            questionremarque: 'Question ? Opinion ?',
            complaintoffice: 'Complaint office',
            complaintform: 'Complaint form',
            yourname: 'Your name',
            howtocontact: 'A way to contact you',
            yourcomplaint: 'Your complaint',
            send: 'Send',
            thankyoufor: 'Thank you for'
        },
        it: {
            questionremarque: 'Domanda ? Reclamo ?',
            complaintoffice: 'Ufficio reclami',
            complaintform: 'Modulo di reclamo',
            yourname: 'Il tuo nome',
            howtocontact: 'Un modo per contattarti',
            yourcomplaint: 'Il tuo reclamo',
            send: 'Inviare',
            thankyoufor: 'Grazie per'
        }
    };

    constructor(private cookieService: CookieService) {
        this.language = this.cookieService.getItem('lang') || 'fr';
    }

    getText(slug: string): string {
        return this.dictionary[this.language]?.[slug] || '';
    }
}
