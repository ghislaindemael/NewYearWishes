import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LanguageService} from '../../services/language/language.service';
import {DatabaseService} from '../../services/database/database.service';
import {NgForOf} from '@angular/common';
import {Address} from '../../types/Address.type';

@Component({
  selector: 'app-contact-page',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        NgForOf
    ],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {

    contactData = {
        name: "",
        message: ""
    }
    addresses: Address[] = [];

    constructor(protected lang: LanguageService, protected databaseService: DatabaseService) {
        this.setAdresses();
    }

    async submitContact() {
        const success = await this.databaseService.sendContact(this.contactData);
        if(success){
            this.contactData = {name: "", message: ""};
            alert(this.lang.getText('thanksformessage'))
        }
    }

    private async setAdresses() {
        this.addresses = await this.databaseService.getAdresses();
    }
}
