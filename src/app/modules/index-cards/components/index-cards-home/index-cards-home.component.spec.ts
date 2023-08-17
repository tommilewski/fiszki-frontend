import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCardsHomeComponent } from './index-cards-home.component';

describe('IndexCardsHomeComponent', () => {
  let component: IndexCardsHomeComponent;
  let fixture: ComponentFixture<IndexCardsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexCardsHomeComponent]
    });
    fixture = TestBed.createComponent(IndexCardsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
