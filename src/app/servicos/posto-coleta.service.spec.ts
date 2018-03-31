import { TestBed, inject } from '@angular/core/testing';

import { PostoColetaService } from './posto-coleta.service';

describe('PostoColetaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostoColetaService]
    });
  });

  it('should be created', inject([PostoColetaService], (service: PostoColetaService) => {
    expect(service).toBeTruthy();
  }));
});
