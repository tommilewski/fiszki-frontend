import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCardsListComponent } from './index-cards-list.component';

describe('IndexCardsListComponent', () => {
  let component: IndexCardsListComponent;
  let fixture: ComponentFixture<IndexCardsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexCardsListComponent]
    });
    fixture = TestBed.createComponent(IndexCardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
