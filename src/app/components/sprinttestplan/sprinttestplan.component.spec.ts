import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprinttestplanComponent } from './sprinttestplan.component';

describe('SprinttestplanComponent', () => {
  let component: SprinttestplanComponent;
  let fixture: ComponentFixture<SprinttestplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprinttestplanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprinttestplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
