import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCardsPageComponent } from './index-cards-page.component';

describe('IndexCardsPageComponent', () => {
  let component: IndexCardsPageComponent;
  let fixture: ComponentFixture<IndexCardsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexCardsPageComponent]
    });
    fixture = TestBed.createComponent(IndexCardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
