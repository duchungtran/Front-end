import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePageProductComponent } from './single-page-product.component';

describe('SinglePageProductComponent', () => {
  let component: SinglePageProductComponent;
  let fixture: ComponentFixture<SinglePageProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePageProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
