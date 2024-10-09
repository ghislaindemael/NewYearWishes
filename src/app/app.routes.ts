import {Routes} from '@angular/router';
import {IntroPageComponent} from './components/intro-page/intro-page.component';
import {UserSelectPageComponent} from './components/user-select-page/user-select-page.component';
import {isLoggedIn} from './auth/is-logged-in.guard';

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
    {
        path: "userselect",
        component: UserSelectPageComponent,
        canActivate: [isLoggedIn]
    }
];
