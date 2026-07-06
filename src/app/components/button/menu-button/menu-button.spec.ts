import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuButton } from './menu-button';

describe('MenuButton', () => {
  let component: MenuButton;
  let fixture: ComponentFixture<MenuButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuButton],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
