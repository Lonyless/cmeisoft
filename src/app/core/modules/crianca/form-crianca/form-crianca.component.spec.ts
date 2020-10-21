import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCriancaComponent } from './form-crianca.component';

describe('FormCriancaComponent', () => {
  let component: FormCriancaComponent;
  let fixture: ComponentFixture<FormCriancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCriancaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCriancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
