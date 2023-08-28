import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCardsFavoritesComponent } from './index-cards-favorites.component';

describe('IndexCardsFavoritesComponent', () => {
  let component: IndexCardsFavoritesComponent;
  let fixture: ComponentFixture<IndexCardsFavoritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexCardsFavoritesComponent]
    });
    fixture = TestBed.createComponent(IndexCardsFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
