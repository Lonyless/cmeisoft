import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BairroListaComponent } from './bairro-lista.component';

describe('BairroListaComponent', () => {
  let component: BairroListaComponent;
  let fixture: ComponentFixture<BairroListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BairroListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BairroListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
