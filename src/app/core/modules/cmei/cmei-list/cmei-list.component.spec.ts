import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmeiListComponent } from './cmei-list.component';

describe('CmeiListComponent', () => {
  let component: CmeiListComponent;
  let fixture: ComponentFixture<CmeiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmeiListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmeiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
