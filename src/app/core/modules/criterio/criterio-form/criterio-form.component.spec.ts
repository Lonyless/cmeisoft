import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterioFormComponent } from './criterio-form.component';

describe('CriterioFormComponent', () => {
  let component: CriterioFormComponent;
  let fixture: ComponentFixture<CriterioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriterioFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriterioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
