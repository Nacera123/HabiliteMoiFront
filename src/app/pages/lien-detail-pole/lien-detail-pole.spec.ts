import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienDetailPole } from './lien-detail-pole';

describe('LienDetailPole', () => {
  let component: LienDetailPole;
  let fixture: ComponentFixture<LienDetailPole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LienDetailPole],
    }).compileComponents();

    fixture = TestBed.createComponent(LienDetailPole);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
