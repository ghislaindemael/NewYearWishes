import {Routes} from '@angular/router';
import {IntroPageComponent} from './components/intro-page/intro-page.component';
import {UserSelectPageComponent} from './components/user-select-page/user-select-page.component';
import {isLoggedIn} from './auth/is-logged-in.guard';
import {ComeBackLaterComponent} from './components/come-back-later/come-back-later.component';
import {ComplaintOfficeComponent} from './components/complaint-office/complaint-office.component';

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
        path: "complaintoffice",
        component: ComplaintOfficeComponent
    },
    {
        path: "**",
        redirectTo: "intro",
    }
];
