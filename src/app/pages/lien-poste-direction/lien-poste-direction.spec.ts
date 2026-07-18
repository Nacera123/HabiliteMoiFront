import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienPosteDirection } from './lien-poste-direction';

describe('LienPosteDirection', () => {
  let component: LienPosteDirection;
  let fixture: ComponentFixture<LienPosteDirection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LienPosteDirection],
    }).compileComponents();

    fixture = TestBed.createComponent(LienPosteDirection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
