import {Component, ElementRef, ViewChild} from '@angular/core';
import {CookieService} from '../../services/cookie/cookie.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-complaint-office',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './complaint-office.component.html',
  styleUrl: './complaint-office.component.css'
})
export class ComplaintOfficeComponent {
    videoPath: string;
    showComplaintForm: boolean = false;

    @ViewChild('videoPlayer', {static: true}) videoPlayer!: ElementRef<HTMLVideoElement>;

    constructor(private cookieService: CookieService) {
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
        //Check supabase insertion
        this.videoPath = "/videos/complainttaken.mp4";
        this.showComplaintForm = false;
        this.videoPlayer.nativeElement.play();
    }
}
