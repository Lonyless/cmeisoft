import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmeiComponent } from './cmei.component';

describe('CmeiComponent', () => {
  let component: CmeiComponent;
  let fixture: ComponentFixture<CmeiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmeiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmeiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
