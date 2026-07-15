import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lienhabilitations } from './lienhabilitations';

describe('Lienhabilitations', () => {
  let component: Lienhabilitations;
  let fixture: ComponentFixture<Lienhabilitations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lienhabilitations],
    }).compileComponents();

    fixture = TestBed.createComponent(Lienhabilitations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
