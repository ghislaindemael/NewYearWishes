import {Routes} from '@angular/router';
import {IntroPageComponent} from './components/intro-page/intro-page.component';
import {UserSelectPageComponent} from './components/user-select-page/user-select-page.component';
import {isLoggedIn} from './auth/is-logged-in.guard';
import {ComplaintOfficeComponent} from './components/complaint-office/complaint-office.component';
import {WishesPageComponent} from './components/wishes-page/wishes-page.component';
import {ConfigPageComponent} from './components/config/config-page.component';
import {ContactPageComponent} from './components/contact/contact-page.component';

export const routes: Routes = [
    {
      path: "config",
      component: ConfigPageComponent,
    },
    {
        path: "intro",
        component: IntroPageComponent,
    },
    {
        path: "contact",
        component: ContactPageComponent,
        canActivate: [isLoggedIn]
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
        path: "**",
        redirectTo: "intro",
    }
];
