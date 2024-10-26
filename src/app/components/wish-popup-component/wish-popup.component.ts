import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Wish} from '../../types/Wish.type';
import {WishesService} from '../../services/wishes/wishes.service';
import {NgClass, NgIf, NgStyle} from '@angular/common';
import {LanguageService} from '../../services/language/language.service';

@Component({
    selector: 'app-wish-popup-component',
    standalone: true,
    imports: [
        NgIf,
        NgStyle,
        NgClass
    ],
    templateUrl: './wish-popup.component.html',
    styleUrl: './wish-popup.component.css'
})
export class WishPopupComponent {
    @Output() wishRemoved = new EventEmitter<number>();
    wish: Wish;
    lang: LanguageService;
    wishesService: WishesService

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { wish: Wish; lang: LanguageService, wishService: WishesService },
        private dialogRef: MatDialogRef<WishPopupComponent>
    ) {
        //console.log(wish)
        this.wish = data.wish;
        this.lang = data.lang;
        this.wishesService = data.wishService;
        setTimeout(() => {
            this.closeAndRemoveWish()
        }, 5000);
    }

    closeAndRemoveWish() {
        this.dialogRef.close();
    }

    async likeWish() {
        if(!this.wish.liked){
            const success = await this.wishesService.likeWish(this.wish);
            if(success){
                this.wish.liked = true;
            }
        }
    }
}
