import { TestBed } from '@angular/core/testing';

import { FriendNotificationsService } from './friend-notifications.service';

describe('FriendNotificationsService', () => {
  let service: FriendNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
