import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeSearchFilterComponent } from './attribute-search-filter.component';

describe('AttributeSearchFilterComponent', () => {
  let component: AttributeSearchFilterComponent;
  let fixture: ComponentFixture<AttributeSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeSearchFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributeSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
