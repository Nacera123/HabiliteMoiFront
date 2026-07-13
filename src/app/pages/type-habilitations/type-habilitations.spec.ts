import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeHabilitations } from './type-habilitations';

describe('TypeHabilitations', () => {
  let component: TypeHabilitations;
  let fixture: ComponentFixture<TypeHabilitations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeHabilitations],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeHabilitations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
