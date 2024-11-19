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
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private location: Location, private _supabase: SupabaseService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      sprintPlanName: ['', Validators.required],
      endDate: [''],
    });
  }


  goBack(): void { this.location.back(); }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      try {
        const data = {
          'sprint_title': this.form.controls['sprintPlanName'].value,
          'end_date': this.form.controls['endDate'].value,
        };
        const result = await this._supabase.saveFormData(data);
        this.router.navigate(['']);
      } catch (error) {
        //
      }
    } else {
      //
    }
  }
}
