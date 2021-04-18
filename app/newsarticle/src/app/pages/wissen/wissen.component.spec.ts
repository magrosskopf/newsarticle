import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WissenComponent } from './wissen.component';

describe('WissenComponent', () => {
  let component: WissenComponent;
  let fixture: ComponentFixture<WissenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WissenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WissenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
