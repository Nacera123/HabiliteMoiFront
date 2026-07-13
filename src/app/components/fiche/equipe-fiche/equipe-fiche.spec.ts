import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeFiche } from './equipe-fiche';

describe('EquipeFiche', () => {
  let component: EquipeFiche;
  let fixture: ComponentFixture<EquipeFiche>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipeFiche],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipeFiche);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
