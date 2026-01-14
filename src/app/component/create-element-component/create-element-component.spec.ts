import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddElementComponent } from './create-element-component';

describe('AddElementComponent', () => {
  let component: AddElementComponent;
  let fixture: ComponentFixture<AddElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddElementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
