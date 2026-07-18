import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienPostePole } from './lien-poste-pole';

describe('LienPostePole', () => {
  let component: LienPostePole;
  let fixture: ComponentFixture<LienPostePole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LienPostePole],
    }).compileComponents();

    fixture = TestBed.createComponent(LienPostePole);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
