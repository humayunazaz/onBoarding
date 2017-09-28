import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdzmComponent } from './ddzm.component';

describe('DdzmComponent', () => {
  let component: DdzmComponent;
  let fixture: ComponentFixture<DdzmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdzmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdzmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
