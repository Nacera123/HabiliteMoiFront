import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienDirection } from './lien-direction';

describe('LienDirection', () => {
  let component: LienDirection;
  let fixture: ComponentFixture<LienDirection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LienDirection],
    }).compileComponents();

    fixture = TestBed.createComponent(LienDirection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
