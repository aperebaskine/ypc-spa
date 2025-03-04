import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaleMenuComponent } from './locale-menu.component';

describe('LocaleMenuComponent', () => {
  let component: LocaleMenuComponent;
  let fixture: ComponentFixture<LocaleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocaleMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocaleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
