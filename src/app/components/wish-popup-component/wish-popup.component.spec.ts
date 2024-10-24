import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishPopupComponent } from './wish-popup.component';

describe('WishPopupComponentComponent', () => {
  let component: WishPopupComponent;
  let fixture: ComponentFixture<WishPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
