import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenTestCardComponent } from './gen-test-card.component';

describe('GenTestCardComponent', () => {
  let component: GenTestCardComponent;
  let fixture: ComponentFixture<GenTestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenTestCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenTestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
