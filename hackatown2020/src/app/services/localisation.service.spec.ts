import { TestBed } from '@angular/core/testing';

import { LocalisationService } from './localisation.service';

describe('LocalisationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalisationService = TestBed.get(LocalisationService);
    expect(service).toBeTruthy();
  });
});
