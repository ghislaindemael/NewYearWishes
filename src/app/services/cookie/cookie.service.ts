import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

    private storage: Storage | null = null;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.storage = localStorage;
        }
    }

    setItem(key: string, value: any): void {
        this.removeItem(key);
        const data = {
            value: value,
        };
        this.storage?.setItem(key, JSON.stringify(data));
    }

    getItem<T>(key: string): T | null {
        const item = this.storage?.getItem(key);
        if (item) {
            const parsedItem = JSON.parse(item);
            return parsedItem.value;
        }
        return null;
    }

    getLang(): string {
        return this.storage?.getItem('lang') || 'fr';
    }

    removeItem(key: string): void {
        this.storage?.removeItem(key);
    }


}
