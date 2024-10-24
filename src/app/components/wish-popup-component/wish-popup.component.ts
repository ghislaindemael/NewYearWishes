import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Wish} from '../../types/Wish.type';
import {WishesService} from '../../services/wishes/wishes.service';

@Component({
  selector: 'app-wish-popup-component',
  standalone: true,
  imports: [],
  templateUrl: './wish-popup.component.html',
  styleUrl: './wish-popup.component.css'
})
export class WishPopupComponent {
    @Output() wishRemoved = new EventEmitter<Wish>();

    constructor(
        @Inject(MAT_DIALOG_DATA) public wish: Wish,
        private dialogRef: MatDialogRef<WishPopupComponent>
    ) {}

    // Close the dialog and emit the event to remove the wish
    closeAndRemoveWish() {
        this.wishRemoved.emit(this.wish);
        this.dialogRef.close();
    }
}
