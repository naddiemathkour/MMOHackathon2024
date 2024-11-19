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
import { SupabaseService } from '../../services/supabase.service';

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

  constructor(private fb: FormBuilder, private location: Location, private _supabase: SupabaseService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      sprintPlanName: ['', Validators.required],
      startDate: ['', [Validators.required]],
      endDate: [''],
      completedDate: [''],
    });
  }


  goBack(): void { this.location.back(); }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      try {
        const data = {
          'sprint_title': this.form.controls['sprintPlanName'].value,
          'start_date': this.form.controls['startDate'].value,
          'end_date': this.form.controls['endDate'].value,
          'completed_date': this.form.controls['completedDate']?.value,
        };
        const result = await this._supabase.saveFormData(data);
        console.log('Data saved:', result);
      } catch (error) {
        console.error('Error saving data:', error);
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
