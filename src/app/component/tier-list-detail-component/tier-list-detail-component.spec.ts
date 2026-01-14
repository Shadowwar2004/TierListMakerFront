import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TierListDetailComponent } from './tier-list-detail-component';

describe('TierListDetailComponent', () => {
  let component: TierListDetailComponent;
  let fixture: ComponentFixture<TierListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TierListDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TierListDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
