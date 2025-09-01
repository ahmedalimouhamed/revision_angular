import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityIndicator } from './availability-indicator';

describe('AvailabilityIndicator', () => {
  let component: AvailabilityIndicator;
  let fixture: ComponentFixture<AvailabilityIndicator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailabilityIndicator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailabilityIndicator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
