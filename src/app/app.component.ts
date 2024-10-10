import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CookieService} from './services/cookie/cookie.service';
import {LanguageSelectionComponent} from './components/language-selection/language-selection.component';

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, LanguageSelectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'LesVoeuxDeGhislain';

  constructor(private cookieService: CookieService) {
  }

  ngOnInit() {
      //Change for deduction through position
      if(this.cookieService.getItem("lang") == null){
          this.cookieService.setItem('lang', 'FR');
      }

  }
}
