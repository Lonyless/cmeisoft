import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterioListComponent } from './criterio-list.component';

describe('CriterioListComponent', () => {
  let component: CriterioListComponent;
  let fixture: ComponentFixture<CriterioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriterioListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriterioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
