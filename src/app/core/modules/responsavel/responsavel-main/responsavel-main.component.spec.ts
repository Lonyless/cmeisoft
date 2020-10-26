import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsavelMainComponent } from './responsavel-main.component';

describe('ResponsavelMainComponent', () => {
  let component: ResponsavelMainComponent;
  let fixture: ComponentFixture<ResponsavelMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsavelMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsavelMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
