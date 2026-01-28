import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignacion } from './modal-asignacion';

describe('ModalAsignacion', () => {
  let component: ModalAsignacion;
  let fixture: ComponentFixture<ModalAsignacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAsignacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAsignacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
