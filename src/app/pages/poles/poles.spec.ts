import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Poles } from './poles';

describe('Poles', () => {
  let component: Poles;
  let fixture: ComponentFixture<Poles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Poles],
    }).compileComponents();

    fixture = TestBed.createComponent(Poles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
