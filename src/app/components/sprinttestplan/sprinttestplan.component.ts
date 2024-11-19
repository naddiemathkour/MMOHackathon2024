import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sprinttestplan',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule],
  providers: [ MatNativeDateModule ],
  templateUrl: './sprinttestplan.component.html',
  styleUrl: './sprinttestplan.component.scss'
})
export class SprinttestplanComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private location: Location) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      sprintPlanName: ['', Validators.required],
      startDate: ['', [Validators.required]],
      endDate: ['']
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Submitted!', this.form.value);
    }
  }


  goBack(): void { this.location.back(); }
}
