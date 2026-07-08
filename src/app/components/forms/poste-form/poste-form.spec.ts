import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteForm } from './poste-form';

describe('PosteForm', () => {
  let component: PosteForm;
  let fixture: ComponentFixture<PosteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosteForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PosteForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
