import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-music-button',
  standalone: true,
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './music-button.component.html',
  styleUrl: './music-button.component.css'
})
export class MusicButtonComponent {

    playMusic() {
        const audio = document.querySelector('audio') as HTMLAudioElement;
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    }
}
