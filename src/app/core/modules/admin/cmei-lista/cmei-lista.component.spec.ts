import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmeiListaComponent } from './cmei-lista.component';

describe('CmeiListaComponent', () => {
  let component: CmeiListaComponent;
  let fixture: ComponentFixture<CmeiListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmeiListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmeiListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
