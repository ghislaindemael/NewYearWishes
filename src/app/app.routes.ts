import {Routes} from '@angular/router';
import {IntroPageComponent} from './components/intro-page/intro-page.component';
import {UserSelectPageComponent} from './components/user-select-page/user-select-page.component';
import {isLoggedIn} from './auth/is-logged-in.guard';
import {ComplaintOfficeComponent} from './components/complaint-office/complaint-office.component';
import {WishesPageComponent} from './components/wishes-page/wishes-page.component';
import {NoMobilePageComponent} from './components/no-mobile/no-mobile-page.component';

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
        path: "wishes",
        component: WishesPageComponent,
        canActivate: [isLoggedIn]
    },
    {
        path: "complaintoffice",
        component: ComplaintOfficeComponent
    },
    {
        path: "nomobile",
        component: NoMobilePageComponent
    },
    {
        path: "**",
        redirectTo: "intro",
    }
];
