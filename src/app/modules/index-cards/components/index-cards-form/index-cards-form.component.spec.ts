import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCardsFormComponent } from './index-cards-form.component';

describe('IndexCardsFormComponent', () => {
  let component: IndexCardsFormComponent;
  let fixture: ComponentFixture<IndexCardsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexCardsFormComponent]
    });
    fixture = TestBed.createComponent(IndexCardsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
