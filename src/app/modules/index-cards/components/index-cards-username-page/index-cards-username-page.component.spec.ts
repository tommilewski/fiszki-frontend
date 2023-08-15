import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCardsUsernamePageComponent } from './index-cards-username-page.component';

describe('IndexCardsUsernamePageComponent', () => {
  let component: IndexCardsUsernamePageComponent;
  let fixture: ComponentFixture<IndexCardsUsernamePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexCardsUsernamePageComponent]
    });
    fixture = TestBed.createComponent(IndexCardsUsernamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
