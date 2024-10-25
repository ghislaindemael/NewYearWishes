import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Wish} from '../../types/Wish.type';
import {WishesService} from '../../services/wishes/wishes.service';
import {NgIf} from '@angular/common';
import {LanguageService} from '../../services/language/language.service';

@Component({
  selector: 'app-wish-popup-component',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './wish-popup.component.html',
  styleUrl: './wish-popup.component.css'
})
export class WishPopupComponent {
    @Output() wishRemoved = new EventEmitter<number>();
    wish: Wish;
    lang: LanguageService;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { wish: Wish; lang: LanguageService },
        private dialogRef: MatDialogRef<WishPopupComponent>
    ) {
        //console.log(wish)
        this.wish = data.wish;
        this.lang = data.lang;
    }

    closeAndRemoveWish() {
        this.wishRemoved.emit(this.wish.id);
        this.dialogRef.close();
    }

    likeWish() {

    }
}
