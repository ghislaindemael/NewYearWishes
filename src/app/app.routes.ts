import {Routes} from '@angular/router';
import {IntroPageComponent} from './components/intro-page/intro-page.component';
import {UserSelectPageComponent} from './components/user-select-page/user-select-page.component';
import {isLoggedIn} from './auth/is-logged-in.guard';
import {ComeBackLaterComponent} from './components/come-back-later/come-back-later.component';

export const routes: Routes = [
    {
        path: "intro",
        component: IntroPageComponent,
    },
    {
        path: "userselect",
        component: UserSelectPageComponent,
        canActivate: [isLoggedIn]
    },
    {
        path: "comebacklater",
        component: ComeBackLaterComponent,
        canActivate: [isLoggedIn]
    },
    {
        path: "",
        redirectTo: "intro",
        pathMatch: "full"
    }
];
