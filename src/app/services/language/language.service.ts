import {Injectable} from '@angular/core';
import {CookieService} from '../cookie/cookie.service';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    private language: string;
    private dictionary: { [key: string]: { [key: string]: string } } = {
        fr: {
            mobilewarning: "Ce site n'est pas optimisé pour les téléphones. Privilégiez votre ordinateur.",
            password: "Mot de passe",
            questionremarque: 'Question ? Remarque ?',
            complaintoffice: 'Bureau des plaintes',
            complaintform: 'Formulaire de plainte',
            yourname: 'Ton nom',
            howtocontact: 'Un moyen de te contacter',
            yourcomplaint: 'Ta plainte',
            send: 'Envoyer',
            thankyoufor: 'Merci pour',
            aquote: 'Une citation',
            aquoteofyou: "Une de tes citations",
            bestpicofyou: "Une image de toi" ,
            picofus: "Une image de nous",
            adate: "Une date",
            aplace: "Un lieu",
        },
        en: {
            mobilewarning: "This website was not designed for mobiles. Experience is better on a computer.",
            password: "Password",
            questionremarque: 'Question ? Opinion ?',
            complaintoffice: 'Complaint office',
            complaintform: 'Complaint form',
            yourname: 'Your name',
            howtocontact: 'A way to contact you',
            yourcomplaint: 'Your complaint',
            send: 'Send',
            thankyoufor: 'Thank you for',
            aquote: 'A quote',
            aquoteofyou: "A quote by you",
            bestpicofyou: "A pic of you" ,
            picofus: "A pic of us",
            adate: "A date",
            aplace: "A place" ,
        },
        it: {
            mobilewarning: "Questo sito web non è stato progettato per i cellulari. L'esperienza è migliore su un computer.",
            password: "Password",
            questionremarque: 'Domanda ? Reclamo ?',
            complaintoffice: 'Ufficio reclami',
            complaintform: 'Modulo di reclamo',
            yourname: 'Il tuo nome',
            howtocontact: 'Un modo per contattarti',
            yourcomplaint: 'Il tuo reclamo',
            send: 'Inviare',
            thankyoufor: 'Grazie per',
            aquote: 'Una citazione',
            aquoteofyou: "Una tua citazione",
            bestpicofyou: "Una foto di te" ,
            picofus: "Una foto di noi",
            adate: "Una data",
            aplace: "Un posto" ,
        }
    };

    constructor(private cookieService: CookieService) {
        this.language = this.cookieService.getItem('lang') || 'fr';
    }

    getText(slug: string): string {
        return this.dictionary[this.language]?.[slug] || '';
    }

    getTextOfLang(lang: string, slug: string): string {
        return this.dictionary[lang]?.[slug] || '';
    }

    setLanguage(lang: string) {
        this.language = lang;
    }
}
