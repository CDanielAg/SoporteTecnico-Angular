import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketComentarios } from './ticket-comentarios';

describe('TicketComentarios', () => {
  let component: TicketComentarios;
  let fixture: ComponentFixture<TicketComentarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketComentarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketComentarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
