import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienPole } from './lien-pole';

describe('LienPole', () => {
  let component: LienPole;
  let fixture: ComponentFixture<LienPole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LienPole],
    }).compileComponents();

    fixture = TestBed.createComponent(LienPole);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
