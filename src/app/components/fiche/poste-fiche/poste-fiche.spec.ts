import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteFiche } from './poste-fiche';

describe('PosteFiche', () => {
  let component: PosteFiche;
  let fixture: ComponentFixture<PosteFiche>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosteFiche],
    }).compileComponents();

    fixture = TestBed.createComponent(PosteFiche);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
