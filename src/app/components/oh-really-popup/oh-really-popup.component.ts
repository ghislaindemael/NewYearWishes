import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-oh-really-popup',
  standalone: true,
  imports: [],
  templateUrl: './oh-really-popup.component.html',
  styleUrl: './oh-really-popup.component.css'
})
export class OhReallyPopupComponent {

    constructor(private dialogRef: MatDialogRef<OhReallyPopupComponent>) {
    }

    onVideoEnded() {
        setTimeout(() => {
            this.dialogRef.close();
        }, 1000);
    }
}
