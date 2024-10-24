import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {Wish} from '../../types/Wish.type';
import {WishesService} from '../../services/wishes/wishes.service';
import {MatDialog} from '@angular/material/dialog';
import {WishPopupComponent} from '../wish-popup-component/wish-popup.component';

@Component({
  selector: 'app-wishes-page',
  standalone: true,
    imports: [
        NgIf,
        NgStyle,
        NgForOf
    ],
  templateUrl: './wishes-page.component.html',
  styleUrl: './wishes-page.component.css'
})
export class WishesPageComponent implements OnInit, AfterViewInit {

    wishes: Wish[] = [];
    wishesPositions: {top: number, left: number}[] = [];

    @ViewChild('parentContainer') parentContainer!: ElementRef;

    constructor(private wishesService: WishesService, private dialog: MatDialog) {

    }

    async ngOnInit() {
        //this.wishes = await this.wishesService.getWishes();
    }

    async ngAfterViewInit() {
        this.wishes = await this.wishesService.getWishes();

        // Call generateRandomPositions after wishes are fetched
        this.generateRandomPositions();
    }

    generateRandomPositions() {
        const parentElement = this.parentContainer.nativeElement;
        const containerWidth = parentElement.clientWidth;
        const containerHeight = parentElement.clientHeight;


        this.wishesPositions = [];

        this.wishes.forEach(() => {
            const randomTop = Math.random() * (containerHeight - 100);
            const randomLeft = Math.random() * (containerWidth - 100);

            console.log(randomTop, randomLeft);

            this.wishesPositions.push({
                top: randomTop,
                left: randomLeft
            });
        });
    }

    viewWish(wish: Wish) {
        const dialogRef = this.dialog.open(WishPopupComponent, {
            panelClass: 'custom-dialog-container',
            data: wish
        });

        dialogRef.componentInstance.wishRemoved.subscribe((removedWish: Wish) => {
            this.removeWish(removedWish);
        });
    }


    removeWish(wishToRemove: Wish) {
        this.wishes = this.wishes.filter(wish => wish !== wishToRemove);
        this.wishesPositions = this.wishesPositions.slice(0, this.wishes.length); // Keep positions in sync
    }


}


