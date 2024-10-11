import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComeBackLaterComponent } from './come-back-later.component';

describe('ComeBackLaterComponent', () => {
  let component: ComeBackLaterComponent;
  let fixture: ComponentFixture<ComeBackLaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComeBackLaterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComeBackLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
