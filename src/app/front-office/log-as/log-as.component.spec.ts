import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAsComponent } from './log-as.component';

describe('LogAsComponent', () => {
  let component: LogAsComponent;
  let fixture: ComponentFixture<LogAsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogAsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
