import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmeiFormComponent } from './cmei-form.component';

describe('CmeiFormComponent', () => {
  let component: CmeiFormComponent;
  let fixture: ComponentFixture<CmeiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmeiFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmeiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
