import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {LanguageService} from '../services/language/language.service';

export const isLoggedIn: CanActivateFn = async () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const lang = inject(LanguageService)

    if (await auth.isLoggedIn()) {
        return true;
    }

    alert(lang.getText('pleaselogin'));
    router.navigate(["/intro"]);
    return false;
};
