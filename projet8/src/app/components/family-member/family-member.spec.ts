import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMember } from './family-member';

describe('FamilyMember', () => {
  let component: FamilyMember;
  let fixture: ComponentFixture<FamilyMember>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyMember]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyMember);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
