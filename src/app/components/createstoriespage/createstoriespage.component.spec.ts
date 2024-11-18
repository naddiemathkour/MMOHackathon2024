import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatestoriespageComponent } from './createstoriespage.component';

describe('CreatestoriespageComponent', () => {
  let component: CreatestoriespageComponent;
  let fixture: ComponentFixture<CreatestoriespageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatestoriespageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatestoriespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
