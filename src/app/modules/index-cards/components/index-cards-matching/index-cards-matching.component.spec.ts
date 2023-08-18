import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCardsMatchingComponent } from './index-cards-matching.component';

describe('IndexCardsMatchingComponent', () => {
  let component: IndexCardsMatchingComponent;
  let fixture: ComponentFixture<IndexCardsMatchingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexCardsMatchingComponent]
    });
    fixture = TestBed.createComponent(IndexCardsMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
