import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadeListaComponent } from './cidade-lista.component';

describe('CidadeListaComponent', () => {
  let component: CidadeListaComponent;
  let fixture: ComponentFixture<CidadeListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CidadeListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CidadeListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
