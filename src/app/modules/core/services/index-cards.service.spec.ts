import { TestBed } from '@angular/core/testing';

import { IndexCardsService } from './index-cards.service';

describe('IndexCardsService', () => {
  let service: IndexCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
