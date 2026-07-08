import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gares } from './gares';

describe('Gares', () => {
  let component: Gares;
  let fixture: ComponentFixture<Gares>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gares],
    }).compileComponents();

    fixture = TestBed.createComponent(Gares);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
