import {Component, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-not-ready-yet-popup',
    standalone: true,
    imports: [],
    templateUrl: './not-ready-yet-popup.component.html',
    styleUrl: './not-ready-yet-popup.component.css',
    encapsulation: ViewEncapsulation.None
})
export class NotReadyYetPopupComponent {
    constructor(private dialogRef: MatDialogRef<NotReadyYetPopupComponent>) {
    }

    close(): void {
        this.dialogRef.close();
    }
}
