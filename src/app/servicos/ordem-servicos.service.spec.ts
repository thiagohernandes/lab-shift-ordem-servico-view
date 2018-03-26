import { TestBed, inject } from '@angular/core/testing';

import { OrdemServicosService } from './ordem-servicos.service';

describe('OrdemServicosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdemServicosService]
    });
  });

  it('should be created', inject([OrdemServicosService], (service: OrdemServicosService) => {
    expect(service).toBeTruthy();
  }));
});
