import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaSupermercadoComponent } from './caja-supermercado.component';

describe('CajaSupermercadoComponent', () => {
  let component: CajaSupermercadoComponent;
  let fixture: ComponentFixture<CajaSupermercadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaSupermercadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaSupermercadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
