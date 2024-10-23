import {Component, ElementRef, ViewChild} from '@angular/core';
import {CookieService} from '../../services/cookie/cookie.service';
import {NgIf} from '@angular/common';
import {LanguageService} from '../../services/language/language.service';
import {FormsModule} from '@angular/forms';
import {DatabaseService} from '../../services/database/database.service';
import {catchError, of} from 'rxjs';

@Component({
  selector: 'app-complaint-office',
  standalone: true,
    imports: [
        NgIf,
        FormsModule
    ],
  templateUrl: './complaint-office.component.html',
  styleUrl: './complaint-office.component.css'
})
export class ComplaintOfficeComponent {
    videoPath: string;
    showComplaintForm: boolean = false;

    complaintData = {
        name: '',
        contact: '',
        complaint: ''
    };

    @ViewChild('videoPlayer', {static: true}) videoPlayer!: ElementRef<HTMLVideoElement>;


    constructor(
        private cookieService: CookieService,
        protected lang: LanguageService,
        private databaseService: DatabaseService,
    ) {
        this.videoPath = "/videos/knockknock.mp4"
    }

    onVideoEnded() {

        if(this.videoPath.includes("knockknock")) {
            const lang = this.cookieService.getItem('lang');
            this.videoPath = `/videos/${lang}/can_i_help_you.mp4`;
        } else if(this.videoPath.includes("can_i_help_you")) {
            this.showComplaintForm = true;
        }
    }

    submitComplaint() {
        if (!this.complaintData.name || !this.complaintData.contact || !this.complaintData.complaint) {
            alert("All fields are required.");
            return;
        }

        this.databaseService.sendComplaint(this.complaintData).pipe(
            catchError(error => {
                console.error('Error submitting complaint:', error);
                alert('Failed to submit complaint. Please try again later.');
                return of(false);
            })
        ).subscribe(success => {
            if (success) {
                this.videoPath = "/videos/complainttaken.mp4";
                this.showComplaintForm = false;
                //this.videoPlayer.nativeElement.play();
            } else {

            }
        });
    }
}
