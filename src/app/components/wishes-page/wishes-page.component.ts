import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Wish} from '../../types/Wish.type';
import {WishesService} from '../../services/wishes/wishes.service';
import {MatDialog} from '@angular/material/dialog';
import {WishPopupComponent} from '../wish-popup-component/wish-popup.component';
import {CookieService} from '../../services/cookie/cookie.service';
import {LanguageService} from '../../services/language/language.service';

@Component({
    selector: 'app-wishes-page',
    standalone: true,
    imports: [
        NgIf,
        NgStyle,
        NgForOf,
        NgClass
    ],
    templateUrl: './wishes-page.component.html',
    styleUrl: './wishes-page.component.css'
})
export class WishesPageComponent implements OnInit, AfterViewInit {

    wishes: Wish[] = [];
    hoveredWishIndex: number | null = null;
    wishesPositions: {
        top: number,
        left: number,
        rotation: number,
        width: number,
        height: number,
        flip: boolean
    }[] = [];
    currentLang: string = 'fr';

    @ViewChild('parentContainer') parentContainer!: ElementRef;

    constructor(
        private wishesService: WishesService,
        private dialog: MatDialog,
        private cookieService: CookieService,
        private languageService: LanguageService
    ) {
        this.cookieService.setItem("reachedwishes", true);
    }

    async ngOnInit() {
        //this.wishes = await this.wishesService.getWishes();
    }

    async ngAfterViewInit() {
        this.wishes = await this.wishesService.getWishes();
        this.generateRandomPositions();
        this.currentLang = this.cookieService.getItem('lang') || 'fr';
    }

    generateRandomPositions() {
        const parentElement = this.parentContainer.nativeElement;
        const containerWidth = parentElement.clientWidth;
        const containerHeight = parentElement.clientHeight;

        this.wishesPositions = [];

        this.wishes.forEach(() => {
            const randomTopPercent = (Math.random() * (containerHeight - 100)) / containerHeight * 100;
            const randomLeftPercent = (Math.random() * (containerWidth - 100)) / containerWidth * 100;

            const randomRotation = (Math.random() * 40) - 20;

            const randomWidthPercent = (Math.random() * (60 - 20) + 30) / containerWidth * 100;
            const randomHeightPercent = (randomWidthPercent * 13) / 20;

            const randomFlip = Math.random() < 0.5;

            this.wishesPositions.push({
                top: randomTopPercent,
                left: randomLeftPercent,
                rotation: randomRotation,
                width: randomWidthPercent,
                height: randomHeightPercent,
                flip: randomFlip,
            });
        });
    }


    viewWish(wish: Wish) {

        wish.viewed = true;

        const dialogRef = this.dialog.open(WishPopupComponent, {
            panelClass: 'custom-dialog-container',
            data: { wish, lang: this.languageService }
        });

        dialogRef.componentInstance.wishRemoved.subscribe((removedWish: number) => {
            this.removeWish(removedWish);
        });
    }


    removeWish(wishToViewId: number) {
        const wish = this.wishes.find(wish => wish.id === wishToViewId);
        if (wish) {
            wish.viewed = true;
        }
        this.wishesPositions = this.wishesPositions.slice(0, this.wishes.length);
    }


}


