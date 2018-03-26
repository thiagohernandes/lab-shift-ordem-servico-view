import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaOrdemServicoComponent } from './nova-ordem-servico.component';

describe('NovaOrdemServicoComponent', () => {
  let component: NovaOrdemServicoComponent;
  let fixture: ComponentFixture<NovaOrdemServicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaOrdemServicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaOrdemServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
