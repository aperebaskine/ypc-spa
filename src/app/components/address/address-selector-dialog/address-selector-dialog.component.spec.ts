import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressSelectorDialogComponent } from './address-selector-dialog.component';

describe('AddressSelectorDialogComponent', () => {
  let component: AddressSelectorDialogComponent;
  let fixture: ComponentFixture<AddressSelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressSelectorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
