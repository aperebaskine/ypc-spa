import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeFilterComponent } from './range-filter.component';

describe('RangeFilterComponent', () => {
  let component: RangeFilterComponent;
  let fixture: ComponentFixture<RangeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
