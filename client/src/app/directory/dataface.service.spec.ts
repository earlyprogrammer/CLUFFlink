/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatafaceService } from './dataface.service';

describe('Service: Dataface', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatafaceService]
    });
  });

  it('should ...', inject([DatafaceService], (service: DatafaceService) => {
    expect(service).toBeTruthy();
  }));
});
