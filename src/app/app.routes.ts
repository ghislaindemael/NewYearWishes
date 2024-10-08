import { Routes } from '@angular/router';
import {IntroPageComponent} from './components/intro-page/intro-page.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "intro",
    pathMatch: "full"
  },
  {
    path: "intro",
    component: IntroPageComponent,
  },
];
